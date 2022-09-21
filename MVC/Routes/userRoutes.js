const express = require('express')
const userController = require('../controllers/userController');

const userRouter = express.Router();

userRouter.post("/register", userController.postUser);


module.exports = userRouter;
