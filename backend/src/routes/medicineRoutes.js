import {addMedicine, getMedicines} from "../controllers/medicineController.js"
import express from "express";

const router = express.Router();

router.get("/medicines", getMedicines);
router.post("/medicines", addMedicine);

export default router;