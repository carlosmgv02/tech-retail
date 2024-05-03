import "dotenv/config";
import Stripe from "stripe";
import { Request, Response } from "express";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export class StripeController {
  createCheckoutSession = async (req: Request, res: Response) => {
    const { line_items, customer_email } = req.body;

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `http://localhost:3001`,
        cancel_url: `http://localhost:3001`,
        customer_email,
      });
      if (session.url) {
        console.log(session.url);

        res.json({ url: session.url });
      } else {
        res.status(500).json({ message: "Failed to create checkout session" });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);

        res.status(500).json({ message: "Server error", error: error.message });
      } else {
        res
          .status(500)
          .json({ message: "Server error", error: "Unknown error" });
      }
    }
  };
}
