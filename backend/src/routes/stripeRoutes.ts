import { Router } from "express";
import { StripeController } from "../controllers/stripeController";
import express from "express";

const router = Router();
const stripeController = new StripeController();

router.post(
  "/create-checkout-session",
  express.json(),
  stripeController.createCheckoutSession
);

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  stripeController.handleWebhook
);

export default router;
