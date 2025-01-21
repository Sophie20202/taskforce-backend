import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  subcategories: string[];
}

const CategorySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    subcategories: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model<ICategory>("Category", CategorySchema);
