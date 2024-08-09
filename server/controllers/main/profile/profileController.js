const express = require("express");
const profileRouter = express.Router();
const {profileGet,profileEdit} = require("./profileRepository");
const {changePassRouter} = require("../changePassword/changePassController")
profileRouter.get("/",  profileGet);
profileRouter.post("/edit", profileEdit ); //was PAtch method
profileRouter.use("/changePassword",changePassRouter)

module.exports = {profileRouter};