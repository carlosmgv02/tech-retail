import { Router } from "express";
import { PurchaseController } from "../controllers/purchaseController";
import express from "express";

const router = Router();
const purchaseController = new PurchaseController();

router.get("", purchaseController.getAll.bind(purchaseController));

export default router;
