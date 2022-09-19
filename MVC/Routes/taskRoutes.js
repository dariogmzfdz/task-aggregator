const express = require('express')
const api = express.Router();

const taskController = require("../controllers/taskController");

api.get("/tasks", taskController.getTasks)
api.post("/tasks", taskController.postTask)

module.exports = api;