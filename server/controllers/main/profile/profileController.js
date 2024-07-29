const express = require("express");
const profileRouter = express.Router();
const {authenticateToken} = require("../../login/loginController")
const {profileGet } = require("./profileRepository");

profileRouter.get("/", authenticateToken, profileGet);
profileRouter.put("/", authenticateToken, profileGet);

module.exports = {profileRouter};