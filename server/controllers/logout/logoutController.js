const express = require("express");
const logoutRouter = express.Router();


logoutRouter.post("/logout", async (req,res)=>{
    if(req.session.userId){
        req.session.destroy();
        res.status(200).json({
            message:"You logout successfully!",
        });
    }
    else return res.status(401).send("ERROR! You must be Login!")
})


module.exports = { logoutRouter };