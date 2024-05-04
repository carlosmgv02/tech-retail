import { Purchase } from "../entity/Purchase";
import { getUserFromtoken } from "../utils/tokenUtils";
import { GenericController } from "./genericController";
import { Request, Response } from "express";
import PDFDocument from "pdfkit";

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
  async generatePdf(req: Request, res: Response) {
    const purchaseId = parseInt(req.params.purchaseId, 10);
    if (isNaN(purchaseId)) {
      return res.status(400).json({ message: "Invalid purchase ID provided" });
    }

    try {
      const purchase = await this.repository.findOne({
        where: { id: purchaseId },
        relations: ["user", "purchaseItems", "purchaseItems.product"],
      });

      if (!purchase) {
        return res.status(404).json({ message: "Purchase not found" });
      }

      const { user, purchaseItems, purchaseDate } = purchase;
      const validTotal = Number(purchase.total);

      res.setHeader(
        "Content-disposition",
        'attachment; filename="purchase-details.pdf"'
      );
      res.setHeader("Content-type", "application/pdf");

      const doc = new PDFDocument({ margin: 50 });
      doc.pipe(res);

      // Title
      doc.fontSize(25).text("Purchase Details", { align: "center" });

      // Buyer information
      doc.fontSize(16).moveDown().text("Buyer Information:");
      doc.fontSize(12).text(`Name: ${user.username}`).moveDown();
      doc.text(`Email: ${user.email}`).moveDown(2);

      // Purchase information
      doc.fontSize(16).text("Purchase Information:");
      doc.fontSize(12).text(`Purchase ID: ${purchase.id}`).moveDown();
      doc.text(`Total: ${validTotal.toFixed(2)} €`).moveDown();
      doc.text(`Date: ${purchaseDate.toISOString().split("T")[0]}`).moveDown(2);

      // Table headers
      const startX = 70;
      const spaceBetween = 10;
      const itemWidth = 280;
      const quantityWidth = 70;
      const priceWidth = 80;
      const startY = doc.y;
      doc.fontSize(14);
      doc.text("Item", startX, startY, { width: itemWidth });
      doc.text("Quantity", startX + itemWidth + spaceBetween, startY, {
        width: quantityWidth,
        align: "right",
      });
      doc.text(
        "Price",
        startX + itemWidth + spaceBetween + quantityWidth + spaceBetween,
        startY,
        { width: priceWidth, align: "right" }
      );

      doc.moveDown();

      // List items
      purchaseItems.forEach((item) => {
        let startY = doc.y;
        doc
          .fontSize(12)
          .text(item.product.name, startX, startY, { width: itemWidth })
          .text(`${item.quantity}`, startX + itemWidth + spaceBetween, startY, {
            width: quantityWidth,
            align: "right",
          })
          .text(
            `${Number(item.priceAtPurchase).toFixed(2)} €`,
            startX + itemWidth + spaceBetween + quantityWidth + spaceBetween,
            startY,
            { width: priceWidth, align: "right" }
          );

        doc.moveDown(0.5); // Add space after each item for better separation
      });

      doc.end();
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      res.status(500).json({ message: "Error generating PDF" });
    }
  }
}
