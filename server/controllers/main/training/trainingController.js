const express = require("express");
const { CreateTraining } = require("./trainingRepository");
const trainingRouter = express.Router();

trainingRouter.get("/")
trainingRouter.post("/create", CreateTraining)

module.exports = {trainingRouter};