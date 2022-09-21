const express = require("express");
const taskRouter = express.Router();

const authMiddleware =require("../Middleware/authMiddleware");
const taskController = require("../controllers/taskController");


taskRouter.get("/tasks", [authMiddleware.secureRoute], taskController.getTasks);
taskRouter.get("/tasks/:id",[authMiddleware.secureRoute], taskController.getTask);
taskRouter.put("/tasks/:id", [authMiddleware.secureRoute], taskController.putTask);
taskRouter.patch("/tasks/:id", [authMiddleware.secureRoute], taskController.changeTask);
taskRouter.delete("/tasks/:id", [authMiddleware.secureRoute], taskController.deleteTask);
taskRouter.post("/tasks", [authMiddleware.secureRoute], taskController.postTask);

module.exports = taskRouter;
