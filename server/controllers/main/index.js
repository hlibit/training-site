const express = require("express");
const mainRouter = express.Router();
const { Sportsman, Trainer} = require("../../models/index");
const {authenticateToken} = require("../login/loginController");



mainRouter.get("/",authenticateToken, async (req,res)=>{
    const token = req.cookies.token;
    if(token !== undefined){
    const sportsman = await Sportsman.findOne({token:token});
      if (sportsman) {
        res.status(200).json({
            message : `Hello, ${sportsman.name}`
        });
      } else {
        const trainer = await Trainer.findOne({token:token});
        res.status(200).json({
            message : `Hello, ${trainer.name}`
        });
      }
    }
});

module.exports = {mainRouter};