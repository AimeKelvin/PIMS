import Router from "express"
import {AddInventoryRecord,checkInventory } from "../controllers/stockController.js"

let router = Router()

router.post("/stock", AddInventoryRecord)
router.get("/stock",checkInventory )

export default router