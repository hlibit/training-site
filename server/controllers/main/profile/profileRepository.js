const {
  Sportsman,
  Trainer,
  validateEditedUser,
} = require("../../../models/index");

const profileGet = async (req, res) => {
  const token = req.cookies.token;
  if (token !== undefined) {
    const sportsman = await Sportsman.findOne({ token: token });
    if (sportsman) {
      res.status(200).json({
        data: sportsman,
      });
    } else {
      const trainer = await Trainer.findOne({ token: token });
      res.status(200).json({
        data: trainer,
      });
    }
  }
};

const profileEdit = async (req, res) => {
  const findErrors = validateEditedUser(req.body);
  if (findErrors) return res.status(400).json({ findErrors });
  const token = req.cookies.token;
  if (token !== undefined) {
    const existingSportsman = await Sportsman.findOne({ token: token });
    if (existingSportsman) {
      await Sportsman.findOneAndUpdate(
        { token: token },
        { ...req.body, password: existingSportsman.password },
        { new: true, runValidators: true }
      );
      res.status(200).json({
        isEdited: true,
        message: "Your profile is updated!",
      });
    } else {
      const existingTrainer = await Trainer.findOne({ token: token });
      await Trainer.findOneAndUpdate(
        { token: token },
        { ...req.body, password: existingTrainer.password },
        { new: true, runValidators: true }
      );
      res.status(200).json({
        isEdited: true,
        message: "Your profile is updated!",
      });
    }
  }
};

module.exports = { profileGet, profileEdit };
