import express from "express";

import {
  getAllInventory,
  addInventory,
} from "../controllers/stockController.js";

const router = express.Router();

router.get("/", getAllInventory);

router.post("/", addInventory);

export default router;