const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");

exports.createUSer = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const newUser = await User.create({
    name,
    email,
    password,
  });
  res.status(201).json({
    newUser,
  });
});

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { password, name, email } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("please enter email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("user does not exist", 400));
  }

  const isPassswordCorrect = await user.correctPassword(password);

  if (!isPassswordCorrect) {
    return next(new ErrorHandler("wrong credentials", 401));
  }
  // const {password, isAdmin, Restinfo} = loginUser._doc

  const token = Jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET
  );
  res.cookie("access_token", token, { httpOnly: true }).status(200).json({
    message: "login successfully",
    user,
  });
});
