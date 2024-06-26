import "dotenv/config";
import Stripe from "stripe";
import { Request, Response } from "express";
import { handleError, handleErrorMessage } from "../utils/errorHandler";
import { Purchase } from "../entity/Purchase";
import { AppDataSource } from "../database";
import { User } from "../entity/User";
import { Product } from "../entity/Product";
import { PurchaseItem } from "../entity/PurchaseItem";
import { ProductController } from "./productController";
import { EmailService } from "../service/emailService";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const productController = new ProductController();

export class StripeController {
  private stripe: Stripe;
  private emailService: EmailService;
  constructor() {
    this.emailService = new EmailService();
  }
  createCheckoutSession = async (req: Request, res: Response) => {
    const { line_items, customer_email } = req.body;

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: process.env.SUCCESS_URL || "http://localhost:3000/success",
        cancel_url: process.env.CANCEL_URL || "http://localhost:3000/failed",
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
  handleWebhook = async (req: Request, res: Response) => {
    const sig: string | string[] = req.headers["stripe-signature"] || "";
    try {
      const event = stripe.webhooks.constructEvent(
        req.body, // Ensure this is a Buffer or a string
        sig,
        endpointSecret || ""
      );

      // Handle the event
      switch (event.type) {
        case "checkout.session.completed":
          const session = event.data.object; // Retrieve the session object from the event data
          console.log("Checkout session completed successfully!");

          if (!session.customer_email) {
            console.error("Customer email not found in the session");
            res.status(400).json({ error: "Customer email not found" });
            return;
          }

          const customerEmail = session.customer_email;
          const lineItems = await stripe.checkout.sessions.listLineItems(
            session.id
          );

          await this.createPurchaseRecord(lineItems, customerEmail);
          break;

        default:
          break;
      }

      res.status(200).json({ received: true });
    } catch (err) {
      handleError(err, res);
    }
  };
  private async createPurchaseRecord(
    lineItems: Stripe.ApiList<any>,
    customerId: string
  ) {
    await productController.handlePurchaseTransaction(lineItems);
    const purchase = new Purchase();
    purchase.total = lineItems.data.reduce(
      (sum, item) => sum + (item.price.unit_amount * item.quantity) / 100,
      0
    );
    const user = await AppDataSource.getRepository(User).findOneBy({
      email: customerId,
    });
    if (!user) {
      throw new Error("User not found");
    }
    purchase.user = user;
    purchase.purchaseItems = [];

    for (const item of lineItems.data) {
      const product = await AppDataSource.getRepository(Product).findOneBy({
        stripePriceId: item.price.id,
      });
      if (!product) {
        throw new Error("Product not found");
      }
      const purchaseItem = new PurchaseItem();
      purchaseItem.product = product;
      purchaseItem.quantity = item.quantity;
      purchaseItem.priceAtPurchase = item.price.unit_amount / 100;
      purchase.purchaseItems.push(purchaseItem);
    }

    await AppDataSource.getRepository(Purchase).save(purchase);
    await this.emailService.sendPurchaseConfirmation(user.email, purchase);
    console.log(`Purchase record created for user ${purchase.user.id}`);
  }
}
