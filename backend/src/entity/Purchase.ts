import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  BaseEntity,
  CreateDateColumn,
} from "typeorm";
import { User } from "./User";
import { PurchaseItem } from "./PurchaseItem";

@Entity()
export class Purchase extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.purchases)
  user: User;

  @OneToMany(() => PurchaseItem, (purchaseItem) => purchaseItem.purchase, {
    cascade: true,
  })
  purchaseItems: PurchaseItem[];

  @Column("decimal", { precision: 10, scale: 2 })
  total: number;

  @CreateDateColumn({ type: "timestamp with time zone" })
  purchaseDate: Date;
}
