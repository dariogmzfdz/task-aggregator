const bcryptjs = require("bcryptjs");
const jwt = require("../services/jwtServices");
const User = require("../Models/userModel");

async function postUser(req, res) {
  const params = req.body;
  const user = new User(params);

  try {
    //require email and password
    if (!params.email) throw { msg: "Error: email can not be null" };
    if (!params.password) throw { msg: "Error: password can not be null" };

    //Avoid duplicated emails
    const emailExists = await User.findOne({ email: params.email });
    if (emailExists) throw { msg: "Email already exists" };

    // encrypting password
    const salt = bcryptjs.genSaltSync(10);
    user.password = await bcryptjs.hash(params.password, salt);

    user.save();
    res.status(201).send({ user: user });
  } catch (error) {
    res.status(500).send(error);
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    User.findOne({ email: email }, async (err, userData) => {
      if (err) {
        res.status(500).send({ msg: "Server status error" });
      } else {
        if (!userData) {
          res.status(400).send({ msg: "Error: email doesn't exists" });
        } else {
          //Check if password match the encrypted pwr
          const passwordCorrect = await bcryptjs.compare(
            password,
            userData.password
          );
          if (!passwordCorrect) {
            res.status(403).send({ msg: "Error incorrect password" });
          } else {
            //Create token with 24h of validation establish in createToken func. in jwtServices.js
            token = await jwt.createToken(userData, "24h");
            res.status(200).send({ token: token });
            console.log(token);
          }
        }
      }
    });
  } catch (error) {
    req.status(500).send(error);
  }
}

module.exports = { postUser, login };
