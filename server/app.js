const express = require("express");
const app = express();
const morgan = require("morgan");
const fs = require("fs").promises;
// const path = require("path");

//temp check
const { Sportsman, Trainer, Training, validate, validateTraining } = require("./models/index");


app.use(express.json());

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
// future register module
// app.post("/add", async (req, res) => {
//   const { name, surname, age, sports, email, password, typeUser } = req.body;
//   const findErrors = validate(req.body);
//   if (findErrors) return res.status(400).json({ findErrors });
//   try {
//     switch (typeUser) {
//       case "Sportsman": {
//         const sportsman = new Sportsman({
//           name,
//           surname,
//           age,
//           sports,
//           email,
//           password,
//           typeUser,
//           trainers: [],
//           trainings: []
//         });
//         await sportsman.save();
//         res.status(201).json({
//           message: "sportsman created",
//           data: sportsman,
//         });
//         break;
//       }
//       case "Trainer": {
//         const trainer = new Trainer({
//           name,
//           surname,
//           age,
//           sports,
//           email,
//           password,
//           typeUser,
//           sportsmen: [],
//           trainings: []
//         });
//         await trainer.save();
//         res.status(201).json({
//           message: "trainer created",
//           data: trainer,
//         });
//         break;
//       }
//       default: {
//         res.status(400).json({ message: "Invalid typeUser" });
//       }
//     }
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

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

module.exports = { app };
