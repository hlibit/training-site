const express = require("express");
const loginRouter = express.Router();
const cookieParser = require("cookie-parser");
const {loginUser ,newSession,authenticateToken} = require("./loginRepository");

loginRouter.use(cookieParser())
loginRouter.use(newSession);
loginRouter.post("/login", loginUser);

module.exports = {loginRouter , authenticateToken};
