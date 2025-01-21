import { Request, Response } from "express";
import Transaction from "../models/Transaction";

const getTransactionSummary = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const transactions = await Transaction.aggregate([
      { $match: { userId: userId } },
      {
        $group: {
          _id: "$category",
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);
    res.status(200).json(transactions);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export { getTransactionSummary };
