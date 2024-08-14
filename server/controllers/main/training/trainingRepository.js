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
  const token = req.cookies.token;
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.id;
    const sportsman = await Sportsman.findById(userId).populate("trainings");

    if (sportsman) {
      const filteredTrainings = [];
      const trainings = await Training.find().populate("trainers");

      trainings.forEach((t) => {
        const isAlreadyTaken = sportsman.trainings.some(
          (userTraining) => userTraining._id.toString() === t._id.toString()
        );

        if (!isAlreadyTaken) {
          filteredTrainings.push(t);
        }
      });

      res.status(200).json(filteredTrainings);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const AddSportsmanTraining = async (req, res) => {
  const { trainingId } = req.body;
  const token = req.cookies.token;
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.id;
    const sportsman = await Sportsman.findById(userId);
    if (sportsman) {
      sportsman.trainings.push(trainingId);
      await sportsman.save();
      res.status(200).json({
        message: "Challenge Accepted",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { CreateTraining, GetTrainings, AddSportsmanTraining };
