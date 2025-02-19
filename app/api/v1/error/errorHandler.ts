export class AppError extends Error {
  statusCode: number;
  details?: any;

  constructor(message: string, statusCode: number, details?: any) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(
    message: string = 'Validation error occurred',
    statusCode: number = 400,
    details?: any
  ) {
    super(message, statusCode, details);
  }
}

export class DatabaseError extends AppError {
  constructor(message: string = 'Database error occurred', statusCode: number = 500) {
    super(message, statusCode);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 404);
  }
}

export class UnauthorizedError extends AppError {
  constructor() {
    super('Unauthorized access', 401);
  }
}

export class ForbiddenError extends AppError {
  constructor() {
    super('Access forbidden', 403);
  }
}

export class ServerError extends AppError {
  constructor(details?: any) {
    super('Internal Server Error', 500, details);
  }
}

// Middleware to handle errors in API responses
export const handleError = (error: any) => {
  console.error(`[ERROR] ${error.name}:`, error.message);

  if (error instanceof AppError) {
    return {
      success: false,
      error: error.name,
      message: error.message,
      details: process.env.NODE_ENV === 'production' ? undefined : error.details,
    };
  }

  return {
    success: false,
    error: 'UnknownError',
    message: 'Something went wrong',
    details: process.env.NODE_ENV === 'production' ? undefined : error.message,
  };
};
