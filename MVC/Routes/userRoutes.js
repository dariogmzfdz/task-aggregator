const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../Middleware/authMiddleware")
const userRouter = express.Router();


userRouter.post("/register", userController.postUser);
userRouter.post("/login", userController.login);
userRouter.get("/users" ,[authMiddleware.secureRoute], userController.getUser);
userRouter.put("/users/:id", [authMiddleware.secureRoute], userController.putUser);

userRouter.delete("/users/:id", [authMiddleware.secureRoute], userController.deleteUser);

module.exports = userRouter;
