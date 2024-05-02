// src/controllers/productController.ts

import { Request, Response } from "express";
import { Product } from "../entity/Product";
import { GenericController } from "./genericController";

export class ProductController extends GenericController<Product> {
  constructor() {
    super(Product);
  }
}
