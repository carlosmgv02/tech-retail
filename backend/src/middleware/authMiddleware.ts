// src/middleware/authMiddleware.ts
import "dotenv/config";

import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "default_secret_key";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: "No token provided!" });
  }

  if (!token.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Invalid token format!" });
  }

  const actualToken = token.slice(7);

  try {
    const decoded = jwt.verify(actualToken, SECRET_KEY) as JwtPayload;
    req.body.userId = decoded.id;
    next();
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(401)
        .json({ message: "Invalid token!", error: error.message });
    } else {
      return res
        .status(401)
        .json({ message: "Invalid token!", error: "Unknown error" });
    }
  }
};
