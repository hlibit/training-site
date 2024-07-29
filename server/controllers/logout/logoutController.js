const express = require("express");
const logoutRouter = express.Router();


logoutRouter.get("/logout", async (req,res)=>{
    if(req.session.userId){
        req.session.destroy();
        res.send("Log-out success");
    }
    else return res.status(401).send("ERROR! You must be Login!")
})


module.exports = { logoutRouter };