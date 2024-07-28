const express = require("express");
const app = express();
const morgan = require("morgan");
const fs = require("fs").promises;
// const path = require("path");

//temp check
const {Sportsman, validate} = require("./models/Sportsman");

app.use(express.json());

//logger
const logger = morgan('tiny', {
    stream: {
        write: async (message) => {
            try {
                await fs.appendFile('./config/actions.log', message);
                console.log('Log was written!');
            } catch (error) {
                console.error('Failed to write log:', error);
            }
        }
    }
});
app.use(logger);
// test
// app.post("/add", async (req,res)=>{
//     const {name,surname, age, sports, email, password} = req.body;
//     const findErrors = validate(req.body);
//     if (findErrors) return res.status(400).json({ findErrors });
//     try {
//         const sportsman = new Sportsman({ name,surname, age, sports, email, password,trainers:[] });
//         await sportsman.save();
//         res.status(201).json({
//           message: "sportsman created",
//           data: sportsman,
//         });
//       } catch (error) {
//         res.status(500).send(error.message);
//       }

// })

module.exports = {app};