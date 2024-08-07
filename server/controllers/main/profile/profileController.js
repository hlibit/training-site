const express = require("express");
const profileRouter = express.Router();
const {authenticateToken} = require("../../login/loginController")
const {profileGet,profileEdit} = require("./profileRepository");

profileRouter.get("/", authenticateToken, profileGet);
profileRouter.post("/edit", authenticateToken,profileEdit ); //was PAtch method

module.exports = {profileRouter};