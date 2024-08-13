const jwt = require("jsonwebtoken");
const {
  Training,
  Trainer,
  validateTraining,
  Sportsman,
} = require("../../../models/index");

const CreateTraining = async (req, res) => {
  const { sports, level, energy, duration, status } = req.body;
  const findErrors = validateTraining(req.body);
  if (findErrors) return res.status(400).json({ findErrors });

  const token = req.cookies.token;

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.id;
    console.log(decoded);
    const trainer = await Trainer.findById(userId);
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    const training = new Training({
      sports,
      level,
      energy,
      duration,
      status,
      trainers: trainer,
    });
    await training.save();

    trainer.trainings.push(training);
    await trainer.save();

    res.status(200).json({ message: "Training was created!" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const GetTrainings = async (req, res) => {
  // const token = req.cookies.token;
  // const decoded = jwt.verify(token, process.env.SECRET_KEY);
  // const userId = decoded.id;

  try {
   const trainings =  await Training.find().populate("trainers");
   res.status(200).json(trainings);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }

};

module.exports = { CreateTraining, GetTrainings };
