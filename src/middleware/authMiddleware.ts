import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend the Express Request interface to include the `user` property (for TypeScript type safety)
declare global {
  namespace Express {
    interface Request {
      user?: string; // `user` will store the user's ID extracted from the JWT
    }
  }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Get the token from the Authorization header (Bearer token)
  const token = req.headers.authorization?.split(" ")[1]; // Assumes format "Bearer <token>"

  if (!token) {
    return res.status(403).json({ error: "Access denied. No token provided." });
  }

  try {
    // Verify the token and extract the user ID (or other data)
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string }; // Decode token payload

    // Attach the user ID to the request object
    req.user = decoded.id;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
};

export default authMiddleware;


