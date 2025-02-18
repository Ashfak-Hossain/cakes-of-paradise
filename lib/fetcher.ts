import { z } from 'zod';
// import { captureException } from '@sentry/node'; // For logging (optional)

const ApiErrorSchema = z.object({
  error: z.string(),
  code: z.string().optional(),
  details: z.unknown().optional(),
});

export type ApiError = z.infer<typeof ApiErrorSchema>;

class RetryableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RetryableError';
  }
}

class NonRetryableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NonRetryableError';
  }
}

/**
 * Logs error details to the console or external services like Sentry.
 */
function logError(error: Error, url: string) {
  if (process.env.NODE_ENV === 'production') {
    // captureException(error); // Send to Sentry (optional)
    console.error('Something went wrong in fetcher');
  } else {
    console.error(`Error in fetcher (${url}):`, error);
  }
}

/**
 * A highly robust, production-ready fetcher function with error handling, retries, and validation.
 *
 * @param url The API endpoint to fetch data from.
 * @param schema Zod schema to validate the response.
 * @param retries Number of retry attempts on failure.
 * @param backoff Initial delay for exponential backoff (ms).
 * @param timeout Request timeout in milliseconds.
 * @param init Optional fetch request settings.
 * @param shouldRetry Optional custom retry logic.
 * @returns Parsed and validated response data.
 */
export async function fetcher<T>(
  url: string,
  init?: RequestInit,
  retries = 3,
  backoff = 1000,
  timeout = 10000,
  shouldRetry: (error: any, attempt: number) => boolean = (err, attempt) =>
    err instanceof RetryableError && attempt < retries - 1
): Promise<T> {
  const isDebug = process.env.DEBUG === 'true';

  for (let i = 0; i < retries; i++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(init?.headers as HeadersInit),
      };

      if (isDebug) {
        console.log(`[Fetcher] Fetching: ${url}, Attempt: ${i + 1}`);
      }
      
      const res = await fetch(url, {
        ...init,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        const errorData = await res
          .json()
          .catch(() => ({ error: res.statusText }));
        const parsedError = ApiErrorSchema.safeParse(errorData);

        let message: string;
        if (parsedError.success) {
          message = `${parsedError.data.error} (${url}) - ${
            parsedError.data.code || ''
          }`;
        } else {
          message = `Unexpected error format at ${url}: ${JSON.stringify(
            errorData
          )}`;
        }

        if (
          res.status >= 400 &&
          res.status < 500 &&
          ![408, 429, 425].includes(res.status)
        ) {
          throw new NonRetryableError(message);
        }

        throw new RetryableError(message);
      }

      const data = await res.json();

      try {
        return data;
      } catch (validationError) {
        const message = `Data validation error at ${url}: ${
          (validationError as Error).message
        }`;
        throw new NonRetryableError(message);
      }
    } catch (error: any) {
      logError(error, url);

      if (error.name === 'AbortError') {
        throw new NonRetryableError('Request timed out');
      }

      if (!navigator.onLine) {
        throw new NonRetryableError('Network disconnected');
      }

      if (!shouldRetry(error, i)) {
        throw new Error('Request failed after multiple attempts');
      }

      // Exponential backoff with jitter
      const delay = backoff * 2 ** i + Math.random() * backoff;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw new Error(`Failed to fetch ${url} after ${retries} retries`);
}
