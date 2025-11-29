import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

/**
 * Generic Zod validation middleware
 * Validates request body, query, and params against provided schema
 */
export const validateRequest = (schema: AnyZodObject) => {
<<<<<<< Updated upstream
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await schema.safeParseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      if (!result.success) {
        const errors = result.error.flatten();
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: {
            body: errors.fieldErrors.body || {},
            query: errors.fieldErrors.query || {},
            params: errors.fieldErrors.params || {},
          },
        });
      }

      // Overwrite with parsed and sanitized data
      if (result.data.body) req.body = result.data.body;
      if (result.data.query) req.query = result.data.query;
      if (result.data.params) req.params = result.data.params;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: error.flatten(),
        });
      }
      next(error);
    }
  };
=======
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await schema.safeParseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });

            if (!result.success) {
                const errors = result.error.flatten();
                return res.status(400).json({
                    success: false,
                    message: 'Validation failed',
                    errors: {
                        body: errors.fieldErrors.body || {},
                        query: errors.fieldErrors.query || {},
                        params: errors.fieldErrors.params || {},
                    },
                });
            }

            // Overwrite with parsed and sanitized data
            if (result.data.body) req.body = result.data.body;
            if (result.data.query) req.query = result.data.query;
            if (result.data.params) req.params = result.data.params;

            next();
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    success: false,
                    message: 'Validation failed',
                    errors: error.flatten(),
                });
            }
            next(error);
        }
    };
>>>>>>> Stashed changes
};

/**
 * Validate only request body
 */
export const validateBody = (schema: AnyZodObject) => {
<<<<<<< Updated upstream
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await schema.safeParseAsync(req.body);

      if (!result.success) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: result.error.flatten().fieldErrors,
        });
      }

      req.body = result.data;
      next();
    } catch (error) {
      next(error);
    }
  };
=======
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await schema.safeParseAsync(req.body);

            if (!result.success) {
                return res.status(400).json({
                    success: false,
                    message: 'Validation failed',
                    errors: result.error.flatten().fieldErrors,
                });
            }

            req.body = result.data;
            next();
        } catch (error) {
            next(error);
        }
    };
>>>>>>> Stashed changes
};

/**
 * Validate only query parameters
 */
export const validateQuery = (schema: AnyZodObject) => {
<<<<<<< Updated upstream
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await schema.safeParseAsync(req.query);

      if (!result.success) {
        return res.status(400).json({
          success: false,
          message: 'Invalid query parameters',
          errors: result.error.flatten().fieldErrors,
        });
      }

      req.query = result.data;
      next();
    } catch (error) {
      next(error);
    }
  };
=======
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await schema.safeParseAsync(req.query);

            if (!result.success) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid query parameters',
                    errors: result.error.flatten().fieldErrors,
                });
            }

            req.query = result.data;
            next();
        } catch (error) {
            next(error);
        }
    };
>>>>>>> Stashed changes
};

/**
 * Validate only route parameters
 */
export const validateParams = (schema: AnyZodObject) => {
<<<<<<< Updated upstream
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await schema.safeParseAsync(req.params);

      if (!result.success) {
        return res.status(400).json({
          success: false,
          message: 'Invalid route parameters',
          errors: result.error.flatten().fieldErrors,
        });
      }

      req.params = result.data;
      next();
    } catch (error) {
      next(error);
    }
  };
=======
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await schema.safeParseAsync(req.params);

            if (!result.success) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid route parameters',
                    errors: result.error.flatten().fieldErrors,
                });
            }

            req.params = result.data;
            next();
        } catch (error) {
            next(error);
        }
    };
>>>>>>> Stashed changes
};
