const { Sportsman, Trainer, validate,} = require("../../models/index");
const bcrypt = require("bcrypt");

const registerUser =   async (req, res) => {
    const { name, surname, age, sports, email, password, typeUser } = req.body;
    const findErrors = validate(req.body);
    if (findErrors) return res.status(400).json({ findErrors });
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
   
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
            isCreated: true,
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
           isCreated: true,
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