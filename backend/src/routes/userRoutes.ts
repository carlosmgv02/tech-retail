// src/routes/genericRoutes.ts

import { Router } from "express";
import { UserController } from "../controllers/userController"; // Importa otros controladores según sea necesario

const router = Router();
const userController = new UserController();

router.get("", userController.getAll.bind(userController));
router.get("/:id", userController.getById.bind(userController));
router.post("", userController.create.bind(userController));
router.put("/:id", userController.update.bind(userController));
router.delete("/:id", userController.delete.bind(userController));

export default router;
