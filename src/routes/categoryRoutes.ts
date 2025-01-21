import { Router } from "express";
import { addCategory, getCategories } from "../contollers/categoryController";

const router = Router();

router.post("/", addCategory);
router.get("/", getCategories);

export default router;
