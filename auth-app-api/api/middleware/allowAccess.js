import { config } from "dotenv";
config();
import jwt from "jsonwebtoken";

export const allowAccess = (RBAC) => async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Missing token" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden: Invalid token" });
      }
      req.user = decoded;
      if (RBAC.includes(decoded.role)) {
        next();
      } else {
        return res
          .status(401)
          .json({ message: "Unauthorized: Access denied!" });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
