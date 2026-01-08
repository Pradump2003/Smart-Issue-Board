const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandler");
const userCollection = require("../models/user.models");

const authenticate = expressAsyncHandler(async (req, res, next) => {
  let token = req?.cookies?.token || req?.headers?.authorization?.split(" ")[1];
  if (!token) return next(new ErrorHandler("You are not logged In", 401));
  let decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  let user = await userCollection.findById(decodedToken.payload);
  if (!user) return next(new ErrorHandler("Invalid token, Login again", 401));
  req.user = user;
  next();
});

module.exports = authenticate;
