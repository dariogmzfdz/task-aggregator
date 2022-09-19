const Task = require("../Models/taskModel");

async function postTask(req, res) {
  const task = new Task(req.body);
  try {
    const taskStore = await task.save();
    console.log(taskStore);
    if (!taskStore) {
      res.status(400).send({ msg: "Error: can not create task" });
    } else {
      res.status(201).send({ task: taskStore });
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

function getTasks(req, res) {
  res.status(200).send({ msg: "Task Controller it's OK" });
}

module.exports = { getTasks, postTask };
