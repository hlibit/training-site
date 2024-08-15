const express = require("express");
const { CreateTraining ,GetTrainings,AddSportsmanTraining,GetUserTrainings,SwitchStatusTraining} = require("./trainingRepository");
const trainingRouter = express.Router();

trainingRouter.get("/",GetTrainings)
trainingRouter.get("/yourTrainings",GetUserTrainings)
trainingRouter.post("/addTraining",AddSportsmanTraining)
trainingRouter.post("/switch",SwitchStatusTraining)
trainingRouter.post("/create", CreateTraining)


module.exports = {trainingRouter};