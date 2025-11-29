/**
 * Standard API response format
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  meta?: {
    pagination?: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
    [key: string]: unknown;
  };
  errors?: Record<string, unknown>;
  code?: string;
}

/**
 * Create a success response
 */
export const successResponse = <T>(
  data: T,
  message?: string,
  meta?: ApiResponse['meta']
): ApiResponse<T> => {
  return {
    success: true,
    message,
    data,
    meta,
  };
};

/**
 * Create a paginated response
 */
export const paginatedResponse = <T>(
  data: T[],
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  },
  message?: string
): ApiResponse<T[]> => {
  return {
    success: true,
    message,
    data,
    meta: {
      pagination,
    },
  };
};

/**
 * Create an error response
 */
export const errorResponse = (
  message: string,
  code?: string,
  errors?: Record<string, unknown>
): ApiResponse => {
  return {
    success: false,
    message,
    code,
    errors,
  };
};
