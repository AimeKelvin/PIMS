import express from "express";
import { getBills } from "../controllers/billController.js";

const router = express.Router();

router.get("/", getBills);

export default router;