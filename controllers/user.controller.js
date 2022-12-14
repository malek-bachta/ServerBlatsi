const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
//GetAllUsers
const index = (req, res) => {
  User.find({})
    .sort({ _id: -1 })
    .exec(function (err, data) {
      if (err) res.status(500).send(err);
      if (data.length == 0) {
        res.json({ message: "There is No User Yet" });
      } else res.send(data);
    });
};

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
//Signup
const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.json({ error: "please add all the feilds" });
  }
  const user = await User.findOne({ email: email });
  if (user) {
    res.json({ error: "SignUp User Exist" });
  }
  else try {
    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      username,
      email: email.toLowerCase(),
      password: hasedPassword,
      avatar: username,
      bio: "RandomBio //TODO",
      codeVerif: "empty",
      codeForget: "empty",
      verified: "NotYet",
    });
    user
      .save()
      .then((user) => {
        res.json({ message: "SignUp Done!" });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    res.status(500).json(err);
  }
};
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
//Login
const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "please provide email or password" });
  }
  User.findOne({ email: email.toLowerCase() }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "invalid email or password" });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          const accessToken = jwt.sign(
            { _id: savedUser._id },
            process.env.JWT_Key
          );
          res.status(200).send(
            JSON.stringify({
              //200 OK
              id: savedUser._id,
              name: savedUser.username,
              email: savedUser.email,
              bio: savedUser.bio,
              avatar: savedUser.avatar,
              token: accessToken,
              role:savedUser.role,
            })
          );
        } else {
          return res.status(422).json({ error: "invalid email or password" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

module.exports = {
  index,
  signup,
  signin,
};
