import express from "express";
import { UserController } from "./controllers/userController";
import { verifyToken } from "./middleware/authMiddleware";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";
import stripeRoutes from "./routes/stripeRoutes";
import cors from "cors";

const app = express();
const port = 3002;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Set up authentication routes without token verification
app.use("/auth", authRoutes);

// Apply the verifyToken middleware to all subsequent routes
app.use(verifyToken);

// Secure routes
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/stripe", stripeRoutes);

// Example of a protected route
app.get("/protected", (req, res) => {
  res.send("This is a protected route");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
