const express = require("express");
const { CreateTraining ,GetTrainings} = require("./trainingRepository");
const trainingRouter = express.Router();

trainingRouter.get("/",GetTrainings)
trainingRouter.post("/create", CreateTraining)

module.exports = {trainingRouter};