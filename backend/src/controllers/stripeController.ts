import "dotenv/config";
import Stripe from "stripe";
import { Request, Response } from "express";
import { handleError, handleErrorMessage } from "../utils/errorHandler";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
export class StripeController {
  createCheckoutSession = async (req: Request, res: Response) => {
    const { line_items, customer_email } = req.body;

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `http://localhost:3001/success`,
        cancel_url: `http://localhost:3001/failed`,
        customer_email,
      });
      if (session.url) {
        console.log(session.url);

        res.json({ url: session.url });
      } else {
        res.status(500).json({ message: "Failed to create checkout session" });
      }
    } catch (error) {
      handleError(error, res);
    }
  };
  handleWebhook = (req: Request, res: Response) => {
    const sig: string | string[] = req.headers["stripe-signature"] || "";
    try {
      // Directly use req.body which should be a Buffer due to express.raw middleware
      const event = stripe.webhooks.constructEvent(
        req.body, // Ensure this is a Buffer or a string
        sig,
        endpointSecret || ""
      );

      console.log("Event:", event.type);

      // Handle the event
      switch (event.type) {
        case "payment_intent.succeeded":
          const paymentIntent = event.data.object;
          console.log("PaymentIntent was successful!");
          break;
        default:
          console.log(`Unhandled event type ${event.type}`);
      }

      res.status(200).json({ received: true });
    } catch (err) {
      if (err instanceof Error) {
        handleErrorMessage(
          "Error in webhook handling: " + err.message,
          400,
          res
        );
      }
    }
  };
}
