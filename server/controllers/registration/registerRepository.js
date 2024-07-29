const { Sportsman, Trainer, validate,} = require("../../models/index");
const bcrypt = require("bcrypt");

const registerUser =   async (req, res) => {
    const { name, surname, age, sports, email, password, typeUser } = req.body;
    const findErrors = validate(req.body);
    if (findErrors) return res.status(400).json({ findErrors });
    
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password,salt);
   
    try {
      switch (typeUser) {
        case "Sportsman": {
          const sportsman = new Sportsman({
            name,
            surname,
            age,
            sports,
            email,
            password: hashedPassword,
            typeUser,
            trainers: [],
            trainings: []
          });
          await sportsman.save();
          res.status(201).json({
            message: "sportsman created",
            data: sportsman,
          });
          break;
        }
        case "Trainer": {
          const trainer = new Trainer({
            name,
            surname,
            age,
            sports,
            email,
            password: hashedPassword,
            typeUser,
            sportsmen: [],
            trainings: []
          });
          await trainer.save();
          res.status(201).json({
            message: "trainer created",
            data: trainer,
          });
          break;
        }
        default: {
          res.status(400).json({ message: "Invalid typeUser" });
        }
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

 module.exports = {registerUser};