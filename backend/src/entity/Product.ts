// src/entity/Product.ts

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  imageUrl: string;

  @Column("decimal", { precision: 10, scale: 2 })
  price: number;

  @Column("int")
  stock: number;
}
