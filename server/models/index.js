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
  validate,
  validateTraining,
  validateAuth,
  validateEditedUser,
  validateNewPassword,
};
