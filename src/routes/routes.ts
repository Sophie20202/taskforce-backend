import express, { Router } from "express";
import userRoutes from "./userRoutes";
import transactionRoutes from "./transactionRoutes";
import categoryRoutes from "./categoryRoutes";
import reportRoutes from "./reportRoutes";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/transaction", transactionRoutes);
router.use("/category", categoryRoutes);
router.use("/report", reportRoutes);

export default router;
