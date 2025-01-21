import { Router } from "express";
import {
  addTransaction,
  getTransactions,
} from "../contollers/transactionController";

const router = Router();

router.post("/", addTransaction);
router.get("/:userId", getTransactions);

export default router;