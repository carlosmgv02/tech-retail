// src/app.ts

import express from "express";
import { UserController } from "./controllers/userController";
import { verifyToken } from "./middleware/authMiddleware";
import userRoutes from "./routes/userRoutes";
import authRotes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";
import cors from "cors";
const app = express();
const port = 3002;
const userController = new UserController();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use("/auth", authRotes);
app.use("/users", userRoutes);
app.use("/products", productRoutes);
// Ejemplo de ruta protegida
app.get("/protected", verifyToken, (req, res) => {
  res.send("This is a protected route");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
