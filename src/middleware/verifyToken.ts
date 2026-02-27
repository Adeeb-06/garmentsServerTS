import { Request, Response, NextFunction } from "express";
import admin from "../config/firebase";

// Extend Request to carry the decoded token email
export interface AuthRequest extends Request {
  token_email?: string;
}

export const verifyToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json("Unauthorized: No token provided");
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.token_email = decoded.email;
    next();
  } catch (error) {
    res.status(401).json("Unauthorized: Invalid token");
  }
};
