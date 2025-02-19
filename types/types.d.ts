/**
 * API response types
 * @module types types.d.ts
 * @exports ApiError - API error response type
 */
export interface ApiError {
  error: string;
  code?: string;
  message?: string;
  details?: string;
}

/**
 * API response type
 * @module types types.d.ts
 * @exports ApiResponse - API response type
 * @template T - The type of the data field in the response
 * @property {boolean} success - Indicates if the request was successful
 * @property {ApiError} error - The error returned by the API
 * @example <caption>Usage</caption>
 * const response: ApiResponse<Ingredient[]> = await fetch('/api/v1/inventory');
 * if (response.success) {
 *    console.log(response.data);
 * } else {
 *    console.error(response.error);
 * }
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
