export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    type: string;
    message: string;
    details?: any;
  };
}

export const successResponse = <T>(data: T): ApiResponse<T> => ({
  success: true,
  data,
});
