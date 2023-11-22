const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors/index");

const bcrypt = require("bcryptjs");

//Register
const register = async (req, res) => {
  // check if user already exist
  const { email, password } = req.body;
  //check valid email & password
  if (!password || !email) {
    throw new BadRequestError("Plese Provide Email & Password");
  }
  const userPresent = await User.findOne({ email });
  //verify user
  if (userPresent) {
    throw new BadRequestError("User Already Exist!");
  }
  const user = await User.create({ ...req.body });

  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

//Login
const login = async (req, res) => {
  const { email, password } = req.body;
  // console.log(`hello${password}`);
  //check valid email & password
  if (!password || !email) {
    throw new BadRequestError("Plese Provide Email & Password");
  }
  const user = await User.findOne({ email });

  //verify user
  console.log(user);
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials !");
  }

  //verify password
  const isPasswordMatch = await user.comparePassword(password);
  console.log(isPasswordMatch);
  if (!isPasswordMatch) {
    throw new UnauthenticatedError("Invalid Credentials !");
  }
  // check if already logged in or not
  if (user.isLoggedin) {
    throw new UnauthenticatedError(
      "User Already Logged In , Please logout first and try again !"
    );
  }
  const token = user.createJWT();
  //make isLoggin true to implement one device one login at a time
  // user.isLoggedin = true;
  // await user.save();
  const filter = { _id: user._id };
  const update = { $set: { isLoggedin: true } };
  const result = await User.updateOne(filter, update);
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

//Logout
const logout = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  // verify user
  if (user) {
    const filter = { _id: user._id };
    const update = { $set: { isLoggedin: false } };
    const result = await User.updateOne(filter, update);
  }
  res
    .status(StatusCodes.OK)
    .json({ token: null, msg: "logged Out Successfully" });
};

module.exports = {
  register,
  login,
  logout,
};
