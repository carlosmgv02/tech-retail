import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import stripeRoutes from "./routes/stripeRoutes";
import purchaseRoutes from "./routes/purchaseRoutes";
import { verifyToken } from "./middleware/authMiddleware";

const app = express();
const port = 3002;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Set up authentication routes without token verification
app.use("/auth", express.json(), authRoutes);

// Apply middleware for parsing JSON only to specific routes where necessary
app.use("/products", express.json(), productRoutes);

// Stripe routes setup
app.use("/stripe", stripeRoutes);

// Apply the verifyToken middleware to all subsequent routes
app.use(verifyToken);
app.use("/users", express.json(), userRoutes);
app.use("/purchases", express.json(), purchaseRoutes);
// Example of a protected route
app.get("/protected", (req, res) => {
  res.send("This is a protected route");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
