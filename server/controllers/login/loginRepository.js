const jwt = require("jsonwebtoken");
const session = require("express-session");
const bcrypt = require("bcrypt");
const { Trainer, Sportsman, validateAuth } = require("../../models/index");
const { SECRET_KEY } = process.env;

const newSession = session({
  secret: SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 12,
  },
});

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!req.session.userId) {
    return res.status(401).json({
      unLogged: true,
    });
  }

  // if (!token) {
  //   return res.status(401).send("No token provided");
  // }
  //maynbe session destroy add

  jwt.verify(token, SECRET_KEY, async (err, user) => {
    if (err) {
      const sportsman = await Sportsman.findById(req.session.userId);
      if (sportsman) {
        sportsman.token = null;
        await sportsman.save();
        return res.status(401).json({
          unLogged: true,
        });
      } else {
        const trainer = await Trainer.findById(req.session.userId);
        trainer.token = null;
        await trainer.save();
        return res.status(401).json({
          unLogged: true,
        });
      }
    }
    req.user = user;
    next();
  });
};


const loginUser = async (req, res) => {
  const { email, password, typeUser } = req.body;
  const findErrors = validateAuth(req.body);
  if (findErrors) return res.status(404).json({ findErrors});
  try {
    switch (typeUser) {
      case "Sportsman":
        const sportsman = await Sportsman.findOne({ email });
        if (!sportsman)
          return res.status(404).send(`User with ${email} [email] not found.`);
        const isMatch = await bcrypt.compare(password, sportsman.password);
        if (!isMatch) return res.status(404).send("Invalid password");

        const token = jwt.sign({ id: sportsman._id }, SECRET_KEY, {
          expiresIn: "1h",
        });
       
        sportsman.token = token;
        await sportsman.save();
        if (sportsman && (isMatch)) {
          req.session.userId = sportsman._id;
          res.cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60,
          });
          res.status(201).json({
            Login: true
          });
        } else res.status(500).json({message : "Authorization error"});
        break;
      case "Trainer":
        const trainer = await Trainer.findOne({ email });
        if (!trainer)
          return res.status(404).send(`User with ${email} [email] not found.`);
        const isMatchT = await bcrypt.compare(password, trainer.password);
        if (!isMatchT) return res.status(404).send("Invalid password");

        const tokenT = jwt.sign({ id: trainer._id }, SECRET_KEY, {
          expiresIn: "1h",
        });
        trainer.token = tokenT;
        await trainer.save();
        if (trainer && (isMatchT)) {
          req.session.userId = trainer._id;
          res.cookie("token", tokenT, { httpOnly: true, maxAge: 1000 * 60*60 });
          res.status(201).json({
            Login: true
          });
        } else res.status(500).json({message : "Authorization error"});
        break;
      default:
        res.status(400).json({ message: "Invalid typeUser" });
        break;
    }
  } catch (error) {
    
    res.status(500).send(error.message);
  }
};

module.exports = { loginUser, newSession, authenticateToken };
