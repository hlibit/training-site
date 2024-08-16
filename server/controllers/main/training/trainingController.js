const express = require("express");
const { CreateTraining ,GetTrainings,AddSportsmanTraining,GetUserTrainings,SwitchStatusTraining,GetHistory} = require("./trainingRepository");
const trainingRouter = express.Router();

trainingRouter.get("/",GetTrainings)
trainingRouter.get("/yourTrainings",GetUserTrainings)
trainingRouter.get("/history",GetHistory)
trainingRouter.post("/addTraining",AddSportsmanTraining)
trainingRouter.post("/switch",SwitchStatusTraining)
trainingRouter.post("/create", CreateTraining)


module.exports = {trainingRouter};