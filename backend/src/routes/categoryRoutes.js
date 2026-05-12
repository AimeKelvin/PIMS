import {addCategory, getCategories} from "../controllers/categoryController.js"
import express from "express";

const router = express.Router();

router.get("/categories", getCategories);
router.post("/categories", addCategory);

export default router;