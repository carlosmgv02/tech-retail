// src/middleware/authMiddleware.ts

import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "default_secret_key";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ message: "No token provided!" });
  }

  token = token.startsWith("Bearer ") ? token.slice(7, token.length) : token;

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
    if (typeof decoded !== "string" && decoded.id) {
      req.body.userId = decoded.id;
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized!" });
    }
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
};
