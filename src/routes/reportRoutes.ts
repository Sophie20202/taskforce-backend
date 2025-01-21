import { Router } from "express";
import { getTransactionSummary } from "../contollers/reportController";

const router = Router();

router.get("/:userId/summary", getTransactionSummary);

export default router;
