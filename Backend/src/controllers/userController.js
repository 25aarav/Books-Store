import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });
};

export const registerUser = async (req, res) => {
  const { fullName, username, email, password, dob, mobile } = req.body;

  if (username.length < 4) {
    return res
      .status(400)
      .json({ message: "Username length should be greater than 3" });
  }

  try {
    const existingUser = await User.findOne({
      $or: [{ email }, { username }, { mobile }]
    });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 16);

    const user = await User.create({
      fullName,
      username,
      email,
      password: hashedPassword,
      dob,
      mobile,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      message: "User registered",
      token,
      user: {
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Handle login

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ email }, { username: email }]
    });

    if (!user)
      return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  res.status(200).json(req.user);
};
