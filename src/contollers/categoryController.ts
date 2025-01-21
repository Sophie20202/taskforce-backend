import { Request, Response } from "express";
import Category from "../models/Category";

const addCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const category = new Category({ name });
    await category.save();
    res.status(201).json(category);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export { addCategory, getCategories };
