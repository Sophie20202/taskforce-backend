import mongoose, { Schema, Document } from "mongoose";

export interface IBudget extends Document {
  userId: mongoose.Types.ObjectId;
  amount: number;
  category: string;
  startDate: Date;
  endDate: Date;
  notificationSent: boolean;
}

const BudgetSchema: Schema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    notificationSent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IBudget>("Budget", BudgetSchema);
