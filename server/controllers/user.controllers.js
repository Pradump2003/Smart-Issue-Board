const expressAsyncHandler = require("express-async-handler");
const userCollection = require("../models/user.model");
const ApiResponse = require("../utils/ApiResponse.utils");
const ErrorHandler = require("../utils/ErrorHandler");
const generateJWTToken = require("../utils/jwt.utils");

const registerUser = expressAsyncHandler(async (req, res) => {
  let { userName, email, password } = req.body;
  let user = await userCollection.create({ userName, email, password });
  new ApiResponse(201, true, "User Created Successfully", user).send(res);
});

const loginUser = expressAsyncHandler(async (req, res, next) => {
  let { email, password } = req.body;
  let existingUser = await userCollection
    .findOne({ email })
    .select("+password");
  console.log(existingUser);
  if (!existingUser)
    return next(new ErrorHandler("No account find this email", 404));
  let isMatch = await existingUser.comparePassword(password);
  if (!isMatch) return next(new ErrorHandler("Invalid Credential", 401));
  let token = await generateJWTToken(existingUser._id);

  res.cookie("token", token, {
    maxAge: 1 * 60 * 60 * 1000,
  });
  new ApiResponse(200, true, "User Login Successfully").send(res);
});

const logoutUser = expressAsyncHandler(async (req, res) => {
  res.clearCookie("token");
  new ApiResponse(200, true, "Logged out successfully").send(res);
});

const getMe = (req, res) => {
  res.status(200).json({
    success: true,
    user: {
      id: req.user._id,
      email: req.user.email,
      userName: req.user.userName,
    },
  });
};

const allUsers = expressAsyncHandler(async (req, res) => {
  const users = await userCollection.find({});
  new ApiResponse(200, true, "Users fetched successfully", users).send(res);
});

module.exports = { registerUser, loginUser, logoutUser, getMe, allUsers };
