import Router from "express";
import {
  getDailyReport,
  getReportByDateRange,
} from "../controllers/reportController.js";

const router = Router();

router.get("/daily", getDailyReport);

router.get("/range", getReportByDateRange);

export default router;