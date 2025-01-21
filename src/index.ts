import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import routes from "./routes/routes";
dotenv.config({ override: true });

const app = express();

app.use(express.json());

app.use("/api", routes);

app.get("/", (req: Request, res: Response) => {
  res.send(`
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            color: #333;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
          }
          .container {
            text-align: center;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 10px;
            background: #fff;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          }
          h1 {
            color: #007bff;
            margin-bottom: 10px;
          }
          p {
            font-size: 16px;
            margin: 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Welcome to Our Web Wallet Backend</h1>
          <p>Your reliable solution for managing transactions securely.</p>
        </div>
      </body>
    </html>
  `);
});


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "");
    console.log("MongoDB connected!");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

connectDB();
