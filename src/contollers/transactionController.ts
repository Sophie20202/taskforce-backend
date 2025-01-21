import { Request, Response } from "express";
import Transaction from "../models/Transaction";

const addTransaction = async (req: Request, res: Response) => {
  const { userId, amount, description, category } = req.body;
  try {
    const transaction = new Transaction({ userId, amount, description, category });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

const getTransactions = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const transactions = await Transaction.find({ userId });
    res.status(200).json(transactions);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export { addTransaction, getTransactions };
