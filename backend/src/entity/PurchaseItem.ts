import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
} from "typeorm";
import { Purchase } from "./Purchase";
import { Product } from "./Product";

@Entity()
export class PurchaseItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Purchase, (purchase) => purchase.purchaseItems)
  purchase: Purchase;

  @ManyToOne(() => Product, (product) => product.purchaseItems)
  product: Product;

  @Column("int")
  quantity: number;

  @Column("decimal", { precision: 10, scale: 2 })
  priceAtPurchase: number;
}
