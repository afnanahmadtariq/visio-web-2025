/**
 * Standard API response format
 */
export interface ApiResponse<T = unknown> {
<<<<<<< Updated upstream
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
=======
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
>>>>>>> Stashed changes
}

/**
 * Create a success response
 */
export const successResponse = <T>(
<<<<<<< Updated upstream
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
=======
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
>>>>>>> Stashed changes
};

/**
 * Create a paginated response
 */
export const paginatedResponse = <T>(
<<<<<<< Updated upstream
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
=======
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
>>>>>>> Stashed changes
};

/**
 * Create an error response
 */
export const errorResponse = (
<<<<<<< Updated upstream
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
=======
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
>>>>>>> Stashed changes
};
