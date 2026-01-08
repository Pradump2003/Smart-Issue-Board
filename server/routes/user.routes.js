const { Router } = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
} = require("../controllers/user.controllers");
const authenticate = require("../middleware/auth.middlewares");

const userRoutes = Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);
userRoutes.get("/logout", logoutUser);
userRoutes.get("/me", authenticate, getMe);

module.exports = userRoutes;
