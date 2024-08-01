const express = require("express");
const mainRouter = express.Router();

const { Sportsman, Trainer} = require("../../models/index");
const {authenticateToken} = require("../login/loginController");
const {profileRouter} = require("../main/profile/profileController")

mainRouter.get("/", authenticateToken, async (req, res) => {
  const token = req.cookies.token;

  if (token) {
    try {
      const sportsman = await Sportsman.findOne({ token: token });

      if (sportsman) {
        res.status(200).json({
          message: `Hello, ${sportsman.name}`,
        });
      } else {
        const trainer = await Trainer.findOne({ token: token });

        if (trainer) {
          res.status(200).json({
            message: `Hello, ${trainer.name}`,
          });
        } else {
          res.status(404).json({
            message: "User not found",
          });
        }
      }
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  } else {
    res.status(401).json({
      message: "No token provided",
    });
  }
});

mainRouter.use("/profile", authenticateToken, profileRouter)

module.exports = {mainRouter};