const bcryptjs = require("bcryptjs");
const jwt = require("../services/jwtServices");
const User = require("../Models/userModel");
const { restart } = require("nodemon");

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

async function getUser(req, res) {
  const user_token = await authMiddleware.getUser(req, res);

  try {
    const user = await User.findById(user_token.id);
    if (!user) {
      res.status(404).send({ msg: "Error: user doesn't exist" });
    } else if (!user._id != user_token.id) {
      res.status(403).send({
        msg: "Forbiden -- Access to this resource on the server is denied!",
      });
    } else {
      //remove password for sequirity reasons
      user.password = null;
      res.status(200).send({ user: user });
    }
  } catch (error) {
    res.status(500).send(error);
  }
}
async function putUser(req, res) {
  //recover id and params
  const userId = req.params.id;
  const params = req.body;
  const user_token = await authMiddleware.getUser(req, res);
  try {
    //get the user
    User.findById(userId, async (err, userData) => {
      if (err) {
        res.status(500).send({ msg: "Server status error" });
      } else {
        //if ther is no data or it is not foun trhw error
        if (!userData) {
          res.status(404).send({ msg: "Error: User not found" });
        } else if (user_token.id !== userData._id) {
          res.status(403).send({ msg: "Error: unauthorized request" });
        } else {
          const salt = bcryptjs.genSaltSync(10);
          // replace old info with the new info received
          userData.name = params.name;
          userData.lastName = params.lastName;
          userData.email = params.email;
          //verify that password is not left uncompleted
          if (params.pasword) {
            userData.password = await bcryptjs.hash(params.password, salt);
          }
        }
      }
      User.findByIdAndUpdate(userId, userData, (err, result) => {
        if (err) {
          res.status(500).send({ msg: "Server status error" });
        } else if (!result) {
          res.status(404).send({ msg: "Error: user doesn't exists" });
        } else {
          res.status(201).send({ user: userData });
        }
      });
    });
  } catch (error) {
    console.error(error);
  }
}

async function deleteUser(req, res) {
  const user_token = await authMiddleware.getUser(req, res);
  const userId = req.params.id;
  try {
    User.findById(userId, (err, userData) => {
      if (err) {
        res.status(500).send({ msg: "Server status error" });
      } else if (user_token.id !== userData.id) {
        res.status(403).send({ msg: "Error: unauthorized request" });
      }
      User.findByIdAndDelete(userId, (err, result) => {
        if (err) {
          res.status(500).send({ msg: "Server status error" });
        } else if (!result) {
          res.status(404).send({ msg: "Error: User doesn't exist" });
        }
        //delete tasks
        Task.deleteMany({ owner: userId }, (err, result) => {
          if (err) {
            console.log("Server status error");
          } else if (!taskData) {
            console.log("No tasks to remove");
          } else {
            console.log("All task have been removed");
          }
        });
        res.status(200).send({ masg: "User deleted succesfully" });
      });
    });
  } catch (error) {
    res.status(500).send({ msg: "Server status error" });
  }
}

module.exports = { postUser, login, getUser, putUser, deleteUser };
