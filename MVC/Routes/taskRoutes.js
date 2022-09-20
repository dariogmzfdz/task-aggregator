const express = require("express");
const api = express.Router();

const taskController = require("../controllers/taskController");

api.get("/tasks", taskController.getTasks);
api.get("/tasks/:id", taskController.getTask);
api.put("/tasks/:id", taskController.putTask);
api.patch("/tasks/:id", taskController.changeTask);
api.delete("/tasks/:id", taskController.deleteTask);
api.post("/tasks", taskController.postTask);

module.exports = api;
