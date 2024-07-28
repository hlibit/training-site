require("dotenv").config();
const mongoose = require("mongoose");
const { app } = require("../app");
const { MNGSTR, PORT } = process.env;

mongoose.connect(MNGSTR).then(() => {
  app.listen(PORT);
}).catch((error) =>{
    console.error(error);
    process.exit(1)
}).finally(()=>{
    console.log("Server has finished starting...")
})
