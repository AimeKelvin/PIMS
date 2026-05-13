import Router from "express";

import {
  getSales,
  addSale,
} from "../controllers/salesController.js";

const router = Router();

router.get("/", getSales);

router.post("/", addSale);

export default router;