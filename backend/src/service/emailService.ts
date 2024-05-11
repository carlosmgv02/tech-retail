import sgMail from "@sendgrid/mail";
import "dotenv/config";

import { Purchase } from "../entity/Purchase";
import { PurchaseItem } from "../entity/PurchaseItem";
import axios from "axios";
import { log } from "console";
sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

export class EmailService {
  private fromEmail: string =
    process.env.SENDGRID_FROM_EMAIL || "noreply@example.com";

  public async sendPurchaseConfirmation(
    to: string,
    purchase: Purchase
  ): Promise<void> {
    const subject = "Purchase Confirmation";
    const text = this.createEmailText(purchase);
    const html = this.createEmailHtml(purchase);
    console.log(purchase);

    const attachments = await this.attachProductImages(purchase.purchaseItems);

    const msg = {
      to,
      from: this.fromEmail,
      subject,
      text,
      html,
      attachments,
    };

    try {
      await sgMail.send(msg);
      console.log("Confirmation email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
      if (error instanceof Error) {
        throw error;
      }
    }
  }

  private createEmailText(purchase: Purchase): string {
    return `Thank you for your purchase! Total: €${purchase.total.toFixed(2)}`;
  }

  private createEmailHtml(purchase: Purchase): string {
    let itemsHtml = purchase.purchaseItems
      .map(
        (item) => `
      <tr>
        <td style="border: 1px solid #ccc; padding: 8px;">
          <img src="cid:${
            item.product.id
          }" style="max-width:100px; max-height:100px;">
        </td>
        <td style="border: 1px solid #ccc; padding: 8px;">${
          item.product.name
        }</td>
        <td style="border: 1px solid #ccc; padding: 8px;">€${item.priceAtPurchase.toFixed(
          2
        )}</td>
        <td style="border: 1px solid #ccc; padding: 8px;">${item.quantity}</td>
        <td style="border: 1px solid #ccc; padding: 8px;">€${(
          item.priceAtPurchase * item.quantity
        ).toFixed(2)}</td>
      </tr>
    `
      )
      .join("");

    return `
      <h1>Thank you for your purchase!</h1>
      <p>Total: €${purchase.total.toFixed(2)}</p>
      <table style="border-collapse: collapse; width: 100%;">
        <thead>
          <tr>
            <th style="border: 1px solid #ccc; padding: 10px; background-color: #f2f2f2;">Image</th>
            <th style="border: 1px solid #ccc; padding: 10px; background-color: #f2f2f2;">Name</th>
            <th style="border: 1px solid #ccc; padding: 10px; background-color: #f2f2f2;">Price</th>
            <th style="border: 1px solid #ccc; padding: 10px; background-color: #f2f2f2;">Quantity</th>
            <th style="border: 1px solid #ccc; padding: 10px; background-color: #f2f2f2;">Total Price</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>
    `;
  }

  private async attachProductImages(
    purchaseItems: PurchaseItem[]
  ): Promise<any[]> {
    return Promise.all(
      purchaseItems.map(async (item) => {
        const imgContent = await this.getImageContent(item.product.imageUrl);
        return {
          content: imgContent,
          filename: `${item.product.name
            .replace(/\s+/g, "_")
            .toLowerCase()}.jpg`,
          type: "image/jpeg",
          disposition: "inline",
          content_id: item.product.id.toString(), // This ID is used in the cid: URL in the HTML
        };
      })
    );
  }

  private async getImageContent(url: string): Promise<string> {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    return Buffer.from(response.data).toString("base64");
  }
}
