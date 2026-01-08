const { Router } = require("express");
const { registerUser, loginUser, logoutUser } = require("../controllers/user.controllers");

const userRoutes = Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);
userRoutes.get("/logout", logoutUser);

module.exports = userRoutes;
