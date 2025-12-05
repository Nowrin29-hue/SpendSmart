// src/controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  findUserByUsername,
  createUser,
} from "../models/userModel.js";

// Helper to generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { userId: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// POST /api/auth/signup
export const signup = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const existing = await findUserByUsername(username);
    if (existing) {
      return res
        .status(409)
        .json({ message: "Username already taken" });
    }

    // IMPORTANT FIX:
    // DB column is "password_hash", not "passwordHash"
    const password_hash = bcrypt.hashSync(password, 10);

    // Create user with correct DB field name
    const user = await createUser({
      username,
      password_hash,
    });

    const token = generateToken(user);

    res.status(201).json({
      message: "Signup successful",
      token,
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/login
export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const user = await findUserByUsername(username);
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid username or password" });
    }

    const isMatch = bcrypt.compareSync(password, user.password_hash);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid username or password" });
    }

    const token = generateToken(user);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (err) {
    next(err);
  }
};
