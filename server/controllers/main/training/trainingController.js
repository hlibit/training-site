const express = require("express");
const { CreateTraining ,GetTrainings,AddSportsmanTraining} = require("./trainingRepository");
const trainingRouter = express.Router();

trainingRouter.get("/",GetTrainings)
trainingRouter.post("/addTraining",AddSportsmanTraining)
trainingRouter.post("/create", CreateTraining)

module.exports = {trainingRouter};