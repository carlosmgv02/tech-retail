import { Purchase } from "../entity/Purchase";
import { getUserFromtoken } from "../utils/tokenUtils";
import { GenericController } from "./genericController";
import { Request, Response } from "express";

export class PurchaseController extends GenericController<Purchase> {
  constructor() {
    super(Purchase);
  }
  async getAll(req: Request, res: Response) {
    const token = req.headers.authorization;
    console.log(token);

    if (!token) {
      res.status(404).json({ message: "No token provided" });
    } else {
      const userId = getUserFromtoken(token);
      const userPurchases = await this.repository.find({
        where: { user: { id: userId } },
        relations: ["purchaseItems", "purchaseItems.product"],
      });
      res.json(userPurchases);
    }
  }
}
