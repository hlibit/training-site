const express = require("express");
const app = express();
const morgan = require("morgan");
const fs = require("fs").promises;
const bodyParser = require("body-parser");
const cors = require("cors")
// const path = require("path");

const {registerRouter} = require("./controllers/registration/registerController")
const {loginRouter} = require("./controllers/login/loginController");
const {logoutRouter}= require("./controllers/logout/logoutController");
const {mainRouter} = require("./controllers/main/index");

//temp check
const { Training, validateTraining } = require("./models/index");


app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors());
//logger
const logger = morgan("tiny", {
  stream: {
    write: async (message) => {
      try {
        await fs.appendFile("./config/actions.log", message);
        console.log("Log was written!");
      } catch (error) {
        console.error("Failed to write log:", error);
      }
    },
  },
});
app.use(logger);

app.use("/api", registerRouter,loginRouter,logoutRouter)
app.use("/api/main", mainRouter);


//future add training module
// app.post("/add/trn", async (req, res) => {
//   const {  sports, energy, duration} = req.body;
//   const findErrors = validateTraining(req.body);
//   if (findErrors) return res.status(400).json({ findErrors });
//   try {
//          const training = new Training({
//           sports,
//           energy,
//           duration,
//           trainers: [],
//           sportsmen: []
//         });
//         await training.save();
//         res.status(201).json({
//           message: "training created",
//           data: training,
//         });    
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

// app.get("/",(req,res)=> {
// if(!Trainer.token || !Sportsman.token){
// res.redirect('/register');
// }
// })

module.exports = { app };
