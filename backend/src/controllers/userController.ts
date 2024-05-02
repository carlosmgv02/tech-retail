// src/controllers/userController.ts

import "dotenv/config";

import { Request, Response } from "express";
import { AppDataSource } from "../database";
import { User } from "../entity/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { GenericController } from "./genericController";

const SECRET_KEY = process.env.JWT_SECRET || "snfuysbftysfctres";
export class UserController extends GenericController<User> {
  constructor() {
    super(User);
  }
  validateToken = async (req: Request, res: Response) => {
    const bearerHeader = req.headers["authorization"];
    if (!bearerHeader) {
      return res.status(403).json({ message: "No token provided" });
    }
    try {
      const token = bearerHeader.split(" ")[1];
      jwt.verify(token, SECRET_KEY);
      res.json({ message: "Token is valid" });
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(401)
          .json({ message: "Invalid token", error: error.message });
      } else {
        res
          .status(401)
          .json({ message: "Invalid token", error: "Unknown error" });
      }
    }
  };
  registerUser = async (req: Request, res: Response) => {
    try {
      const { username, password, email } = req.body;
      const userRepository = AppDataSource.getRepository(User);

      const existingUser = await userRepository.findOneBy({ username });
      if (existingUser) {
        return res.status(409).json({ message: "Username already exists" });
      }

      const hashedPassword = bcrypt.hashSync(password, 8);
      const user = new User();
      user.username = username;
      user.password = hashedPassword;
      user.email = email;

      await userRepository.save(user);
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: "Server error", error: error.message });
      } else {
        res
          .status(500)
          .json({ message: "Server error", error: "Unknown error" });
      }
    }
  };

  loginUser = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      const userRepository = AppDataSource.getRepository(User);

      const user = await userRepository.findOneBy({ username });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: 86400 });
      res.json({ token });
    } catch (error) {
      // Utilizar este fragmento donde manejes errores (como en los controladores)

      if (error instanceof Error) {
        res.status(500).json({ message: "Server error", error: error.message });
      } else {
        res
          .status(500)
          .json({ message: "Server error", error: "Unknown error" });
      }
    }
  };
}
