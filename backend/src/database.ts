// src/data-source.ts

import { DataSource } from "typeorm";
import "dotenv/config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ["src/entity/**/*.ts"],
  synchronize: true, // Cuidado con esto en producción
  logging: false,
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data source has been initialized!");
  })
  .catch((error) => {
    console.error("Error during Data Source initialization", error);
  });
