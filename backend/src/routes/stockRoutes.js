import express from "express";

import {
  getAllInventory,
  addInventory,
} from "../controllers/stockController.js";

const router = express.Router();

router.get("/stock", getAllInventory);

router.post("/stock", addInventory);

export default router;