import { Request, Response, NextFunction } from "express";

// Extend Express Request to attach custom user fields
export interface AuthRequest extends Request {
  userEmail?: string;
  userId?: string;
}

// Generic async handler to avoid try/catch boilerplate in controllers
export const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
