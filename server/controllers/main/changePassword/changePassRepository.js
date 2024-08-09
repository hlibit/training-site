const {
  Sportsman,
  Trainer,
  validateNewPassword,
} = require("../../../models/index");
const bcrypt = require("bcrypt");

const changePassword = async (req, res) => {
  const { password } = req.body;
  const token = req.cookies.token;

  const findErrors = validateNewPassword(req.body);
  if (findErrors) return res.status(400).json({ findErrors });

  try {
    const sportsman = await Sportsman.findOne({ token: token });
    if (sportsman) {
      const compare = await bcrypt.compare(password, sportsman.password);
      if (!compare) { 
        const salt = await bcrypt.genSalt(10);
        sportsman.password = await bcrypt.hash(password, salt);
        await sportsman.save();
        return res.status(200).json({
          message: "Password has changed!",
        });
      } else {
        return res.status(400).send("New password can't be the same as the current password");
      }
    } else {
      const trainer = await Trainer.findOne({ token: token });
      if(trainer){
        const compare = await bcrypt.compare(password, trainer.password);
        if (!compare) { // Passwords are different, so we can change it
          const salt = await bcrypt.genSalt(10);
          trainer.password = await bcrypt.hash(password, salt);
          await trainer.save();
          return res.status(200).json({
            message: "Password has changed!",
          });
        } else {
          return res.status(400).send("New password can't be the same as the current password");
        }
      }
    }
    res.status(404).send("User not found");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { changePassword };
