const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
// const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  console.log("inside the register..");
  const user = await User.create({ ...req.body });
  console.log("After user created :" + user);
  const token = user.createJWT();
  console.log("After token created token:" + token);

  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};
const login = async (req, res) => {
  console.log("Inside login");
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide valid email and password");
  }
  const user = await User.findOne({ email });
  console.log("User found:" + user);
  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }
  const isCorrectPassword = await user.comparePassword(password);
  if (!isCorrectPassword) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const token = user.createJWT();
  console.log("User token:" + token);
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = {
  register,
  login,
};
