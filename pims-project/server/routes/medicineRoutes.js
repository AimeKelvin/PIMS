import {addMedicine, getMedicines} from "../controllers/medicineController.js"
import express from "express";

const router = express.Router();

router.get("/", getMedicines);
router.post("/", addMedicine);

export default router;