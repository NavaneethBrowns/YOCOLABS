import { config } from "dotenv";
config();

import sequelize from "../../config/dbConnection.js";
import { AuthModel } from "../model/auth.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const Auth = await AuthModel(sequelize);

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Auth.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValidPassword = await user.validatePassword(password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { username: user.username, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({ ...user.dataValues,accessToken: token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const signup = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    const newUser = await Auth.create({
      username,
      passwordHash: await hashPassword(password),
      role,
    });

    return res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};
