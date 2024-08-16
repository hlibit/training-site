const { trainingHistory } = require("./histroryTraining");
const { Sportsman } = require("./Sportsman");
const { Trainer } = require("./Trainer");
const { Training } = require("./Training");

const {
  validate,
  validateAuth,
  validateTraining,
  validateEditedUser,
  validateNewPassword,
} = require("./autorization");


module.exports = {
  Sportsman,
  Trainer,
  Training,
  trainingHistory,
  validate,
  validateTraining,
  validateAuth,
  validateEditedUser,
  validateNewPassword,
};
