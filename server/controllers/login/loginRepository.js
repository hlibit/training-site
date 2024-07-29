const jwt = require("jsonwebtoken");
const session = require("express-session");
const bcrypt = require("bcrypt");
const { Trainer, Sportsman, validate } = require("../../models/index");
const { SECRET_KEY } = process.env;

const newSession = session({
  secret: SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60,
  },
});

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!req.session.userId) {
    return res.status(401).send("Login first");
  }

  if (!token) {
    return res.status(401).send("No token provided");
  }
//maynbe session destroy add

  jwt.verify(token, SECRET_KEY, async (err, user) => {
    if (err) {
      const sportsman = await Sportsman.findById(req.session.userId);
      if (sportsman) {
        sportsman.token = null;
        await sportsman.save();
        res.status(403).send("U must be logged in");
      } else {
        const trainer = await Trainer.findById(req.session.userId);
        trainer.token = null;
        await trainer.save();
        res.status(403).send("U must be logged in");
      }
    } else return res.send("welcome");
    req.user = user;
    next();
  });
 
    
};

const loginUser = async (req, res) => {
  const { email, password, typeUser } = req.body;
  const findErrors = validate(req.body);
  if (findErrors) return res.status(404).json({ findErrors });
  try {
    switch (typeUser) {
      case "Sportsman":
        const sportsman = await Sportsman.findOne({ email });
        if (!sportsman)
          return res.status(404).send(`User with ${email} [email] not found.`);
        const isMatch = bcrypt.compare(password, sportsman.password);
        if (!isMatch) return res.status(404).send("Invalid password");

        const token = jwt.sign({ id: sportsman._id }, SECRET_KEY, {
          expiresIn: "10s",
        });
        sportsman.token = token;
        await sportsman.save();
        if (sportsman && (await bcrypt.compare(password, sportsman.password))) {
          req.session.userId = sportsman._id;
          res.cookie("token", token, { httpOnly: true });
          res.status(201).json({
            token: token,
            Status: "You logined succesfully",
          });
        } else res.status(500).send("Authorization error");
        break;
      case "Trainer":
        const trainer = await Trainer.findOne({ email });
        if (!trainer)
          return res.status(404).send(`User with ${email} [email] not found.`);
        const isMatchT = bcrypt.compare(password, trainer.password);
        if (!isMatchT) return res.status(404).send("Invalid password");

        const tokenT = jwt.sign({ id: trainer._id }, SECRET_KEY, {
          expiresIn: "10s",
        });
        trainer.token = tokenT;
        await trainer.save();

        if (trainer && (await bcrypt.compare(password, trainer.password))) {
          req.session.userId = trainer._id;
          res.cookie("token", tokenT, { httpOnly: true });
          res.status(201).json({
            token: tokenT,
            Status: "You logined succesfully",
          });
        } else res.status(500).send("Authorization error");
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
