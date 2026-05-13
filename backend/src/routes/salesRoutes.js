import Router from "express";

import {
  getSales,
  addSale,
} from "../controllers/salesController.js";

const router = Router();

router.get("/sales", getSales);

router.post("/sales", addSale);

export default router;