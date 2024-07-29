const { Sportsman, Trainer, validate } = require("../../../models/index");


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
  const findErrors = validate(req.body);
  if (findErrors) return res.status(400).json({ findErrors });
  const token = req.cookies.token;
  if (token !== undefined) {
    const existingSportsman = await Sportsman.findOne({ token: token });
    const sportsman = await Sportsman.findOneAndUpdate(
      { token: token },
      { ...req.body, password: existingSportsman.password },
      { new: true, runValidators: true }
    );

    if (sportsman) {
      res.status(200).json({
        data: sportsman,
      });
    } else {
      const existingTrainer = await Trainer.findOne({ token: token });
      const trainer = await Trainer.findOneAndUpdate(
        { token: token },
        { ...req.body, password: existingTrainer.password },
        { new: true, runValidators: true }
      );
      res.status(200).json({
        data: trainer,
      });
    }
  }
};

module.exports = { profileGet, profileEdit };
