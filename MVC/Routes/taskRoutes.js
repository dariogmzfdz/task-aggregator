const express = require("express");
const taskRouter = express.Router();

const taskController = require("../controllers/taskController");

taskRouter.get("/tasks", taskController.getTasks);
taskRouter.get("/tasks/:id", taskController.getTask);
taskRouter.put("/tasks/:id", taskController.putTask);
taskRouter.patch("/tasks/:id", taskController.changeTask);
taskRouter.delete("/tasks/:id", taskController.deleteTask);
taskRouter.post("/tasks", taskController.postTask);

module.exports = taskRouter;
