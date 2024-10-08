const jwt = require("jsonwebtoken");
const {
  Training,
  Trainer,
  trainingHistory,
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
      const trainingCurr = await Training.findById(trainingId)
        .populate("trainers")
        .populate("sportsmen");
      const trainerCurr = await Trainer.findById(trainingCurr.trainers[0]._id);

      if (!trainerCurr.sportsmen.includes(sportsman._id)) {
        trainerCurr.sportsmen.push(sportsman._id);
      }

      if (!trainingCurr.sportsmen.includes(sportsman._id)) {
        trainingCurr.sportsmen.push(sportsman._id);
      }

      if (!sportsman.trainers.includes(trainingCurr.trainers[0]._id)) {
        sportsman.trainers.push(trainingCurr.trainers[0]._id);
      }

      if (!sportsman.trainings.includes(trainingId)) {
        sportsman.trainings.push(trainingId);
      }
      await sportsman.save();
      await trainerCurr.save();
      await trainingCurr.save();

      res.status(200).json({ message: "Challenge Accepted" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Internal server error: ${error.message}` });
  }
};

const GetUserTrainings = async (req, res) => {
  const token = req.cookies.token;
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.id;
    let userTrainingsId = [];
    const sportsman = await Sportsman.findById(userId);
    let typeUser = "";
    if (sportsman) {
      userTrainingsId = sportsman.trainings;
      typeUser = sportsman.typeUser;
    } else {
      const trainer = await Trainer.findById(userId);
      userTrainingsId = trainer.trainings;
      typeUser = trainer.typeUser;
    }
    const userTrainings = await Promise.all(
      userTrainingsId.map(async (t) => {
        const training = await Training.findById(t)
          .populate("trainers")
          .populate("sportsmen");
        return training ? training : null;
      })
    );

    const filteredTrainings = userTrainings.filter(
      (training) => training !== null
    );

    res.status(200).json({ filteredTrainings, typeUser: typeUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Internal server error: ${error.message}` });
  }
};

const SwitchStatusTraining = async (req, res) => {
  const token = req.cookies.token;
  const { trainingId, status } = req.body;

  try {
    const training = await Training.findById(trainingId)
      .populate("trainers")
      .populate("sportsmen");

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.id;

    const sportsman = await Sportsman.findById(userId);
    const trainer = await Trainer.findById(training.trainers[0]._id);

    if (status === "Finished") {
      const curSportsmen = await Sportsman.find({ trainings: trainingId });
      training.status = status;
      await training.save();

      const finishedTraining = new trainingHistory({
        status,
        canceledBy: "None",
        trainings: {
          _id: training._id,
          sports: training.sports,
          level: training.level,
          energy: training.energy,
          duration: training.duration,
          status: training.status,
          sportsmen: training.sportsmen,
        },
        sportsmen: curSportsmen,
        trainers: trainer,
      });

      await finishedTraining.save();

      for (let curSportsman of curSportsmen) {
        curSportsman.trainings.pull(training._id);
        await curSportsman.save();

        const trainerHasActiveTrainings = await Training.exists({
          trainers: trainer._id,
          sportsmen: curSportsman._id,
          status: { $ne: "Finished" },
        });

        if (!trainerHasActiveTrainings) {
          trainer.sportsmen.pull(curSportsman._id);
          curSportsman.trainers.pull(trainer._id);
          await trainer.save();
          await curSportsman.save();
        }
      }

      trainer.trainings.pull(trainingId);
      await trainer.save();

      await Training.findByIdAndDelete(trainingId);
      return res.status(200).json({ message: "Training finished" });
    } else {
      if (sportsman) {
        const cancelledTraining = new trainingHistory({
          status,
          canceledBy: "Sportsman",
          trainings: {
            _id: training._id,
            sports: training.sports,
            level: training.level,
            energy: training.energy,
            duration: training.duration,
            status: training.status,
            sportsmen: training.sportsmen,
          },
          sportsmen: sportsman,
          trainers: trainer,
        });
        await cancelledTraining.save();
        training.status = status;
        await training.save();

        training.sportsmen.pull(sportsman._id);
        sportsman.trainings.pull(training._id);
        sportsman.rating -= 0.5;
        await sportsman.save();
        await training.save();

        const trainerHasActiveTrainings = await Training.exists({
          trainers: trainer._id,
          sportsmen: sportsman._id,
          status: { $ne: "Canceled" },
        });

        if (!trainerHasActiveTrainings) {
          trainer.sportsmen.pull(sportsman._id);
          sportsman.trainers.pull(trainer._id);
          await trainer.save();
          await sportsman.save();
        }

        return res.status(200).json({
          message: "Training cancelled. Rating loss.",
        });
      } else if (trainer) {
        const curSportsmen = await Sportsman.find({ trainings: trainingId });

        const cancelledTraining = new trainingHistory({
          status,
          canceledBy: "Trainer",
          trainings: {
            _id: training._id,
            sports: training.sports,
            level: training.level,
            energy: training.energy,
            duration: training.duration,
            status: training.status,
            sportsmen: training.sportsmen,
          },
          sportsmen: curSportsmen,
          trainers: trainer,
        });

        await cancelledTraining.save();

        for (let curSportsman of curSportsmen) {
          curSportsman.trainings.pull(training._id);
          await curSportsman.save();
          training.status = status;
          await training.save();
          const trainerHasActiveTrainings = await Training.exists({
            trainers: trainer._id,
            sportsmen: curSportsman._id,
            status: { $ne: "Canceled" },
          });

          if (!trainerHasActiveTrainings) {
            trainer.sportsmen.pull(curSportsman._id);
            curSportsman.trainers.pull(trainer._id);
            await trainer.save();
            await curSportsman.save();
          }
        }

        trainer.trainings.pull(trainingId);
        trainer.rating -= 0.5;
        await trainer.save();

        await Training.findByIdAndDelete(trainingId);
        return res
          .status(200)
          .json({ message: "Training canceled and removed." });
      }
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Internal server error: ${error.message}` });
  }
};

const GetHistory = async (req, res) => {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  const userId = decoded.id;
  try {
    const sportsman = await Sportsman.findById(userId);
    if (sportsman) {
      const sportsmanHistory = await trainingHistory
        .find({ sportsmen: sportsman._id })
        .populate("trainings")
        .populate("trainers");
      res
        .status(200)
        .json({ history: sportsmanHistory, typeUser: sportsman.typeUser });
    } else {
      const trainer = await Trainer.findById(userId);
      const trainerHistory = await trainingHistory
        .find({
          trainers: trainer._id,
          $or: [{ status: "Finished" }, { canceledBy: "Trainer" }],
        })
        .populate("trainings")
        .populate("sportsmen");
      res
        .status(200)
        .json({ history: trainerHistory, typeUser: trainer.typeUser });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Internal server error: ${error.message}` });
  }
};

module.exports = {
  CreateTraining,
  GetTrainings,
  AddSportsmanTraining,
  GetUserTrainings,
  SwitchStatusTraining,
  GetHistory,
};
