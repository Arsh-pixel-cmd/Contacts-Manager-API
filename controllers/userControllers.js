import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// create user controller for login register and get user information
// to give label for api we will give

// @desc: register a user
// @routes post /api/users/register
// @access public


const registerUser = asyncHandler(async (req, res) => {
  const { userName, userEmail, password } = req.body;

  if (!userName || !userEmail || !password) {
    res.status(400).json({ error: "Please fill all the fields" });
    return;
  }

  const existingUser = await User.findOne({ userEmail });
  if (existingUser) {
    res.status(400).json({ error: "Email address already in use" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ userName, userEmail, password: hashedPassword });

  if (user) {
    const token = jwt.sign({ id: user.id, email: userEmail }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "35m" });
    res.status(201).json({ id: user.id, email: userEmail, token });
  } else {
    res.status(400).json({ error: "User creation failed" });
  }
});


// @desc: login a user
// @routes post /api/users/login
// @access public

const loginUser = asyncHandler(async (req, res) => {
  const { userEmail, password } = req.body;
  if (!userEmail || !password) {
    res.status(400).json({ error: "Please fill all fields" });
    return;
  }

  const user = await User.findOne({ userEmail });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user.id, email: userEmail }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1m" });
    res.status(200).json({ token });
  } else {
    res.status(401).json({ error: "Email or password is not valid" });
  }
});


// @desc: current user information
// @routes get /api/users/current
// @access private

const currentUser = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401).json({ error: "User not found" });
  } else {
    res.json(req.user);
  }
});

export { registerUser, loginUser, currentUser };