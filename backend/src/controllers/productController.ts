// src/controllers/productController.ts

import { Request, Response } from "express";
import { Product } from "../entity/Product";
import { GenericController } from "./genericController";
import { getManager } from "typeorm";
import Stripe from "stripe";

export class ProductController extends GenericController<Product> {
  constructor() {
    super(Product);
  }
  async getAll(req: Request, res: Response) {
    try {
      const products = await this.repository.find({
        relations: ["category"],
      });
      res.json(
        products.map((product) => {
          return {
            ...product,
            category: product.category.name,
          };
        })
      );
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error retrieving entities" });
    }
  }
  async handlePurchaseTransaction(items: Stripe.ApiList<any>) {
    for (const item of items.data) {
      const product = await this.repository.findOneBy({
        stripePriceId: item.price.id,
      });
      if (product) {
        product.stock -= item.quantity;
        await this.repository.save(product);
        console.log(`Stock updated for product ${product.id}`);
      }
    }
  }
}
