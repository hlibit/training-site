const express = require("express");
const registerRouter = express.Router();
const {registerUser} = require("./registerRepository");

registerRouter.post("/register", registerUser);

module.exports = {registerRouter};

