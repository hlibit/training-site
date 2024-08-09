const express = require("express");
const changePassRouter = express.Router();
const {changePassword} = require("./changePassRepository");


changePassRouter.post("/", changePassword);

module.exports = {changePassRouter};