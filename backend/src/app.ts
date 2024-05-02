// src/app.ts

import express from "express";
import { UserController } from "./controllers/userController";
import { verifyToken } from "./middleware/authMiddleware";
import userRoutes from "./routes/userRoutes";
const app = express();
const port = 3002;
const userController = new UserController();
app.use(express.json());

app.post("/register", userController.registerUser);
app.post("/login", userController.loginUser);
app.use("/users", userRoutes);
// Ejemplo de ruta protegida
app.get("/protected", verifyToken, (req, res) => {
  res.send("This is a protected route");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
