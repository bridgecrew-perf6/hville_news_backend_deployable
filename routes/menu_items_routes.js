import express from "express";
import { createMenuItem ,show, show_all, show_deals, updateItem } from "../controllers/menu_item_controller";

const router = express.Router()

//get::
router.get("/menu_items",show_all)
router.get('/menu_items/:id', show)
router.get("/deals", show_deals)

//post::
router.post("/create-menu-item", createMenuItem)

//put::
router.put("/menu_items/:id/update_details", updateItem)



module.exports = router;