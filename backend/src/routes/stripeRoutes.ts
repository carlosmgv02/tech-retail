import { Router } from "express";
import { StripeController } from "../controllers/stripeController";

const router = Router();
const stripeController = new StripeController();

router.post("/create-checkout-session", stripeController.createCheckoutSession);

export default router;
