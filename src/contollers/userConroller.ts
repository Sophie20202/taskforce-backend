import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req: Request, res: Response):Promise<any> => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    const userFind = await User.findOne({ email });
    if (userFind) return res.status(501).json({ error: "User exists" });
    await user.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error: any) { 
    res.status(500).json({ error: error });
  }
};

const login = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error: any) { // Type error as `any`
    res.status(500).json({ error: error.message });
  }
};

export { register, login };

