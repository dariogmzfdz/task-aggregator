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

async function getTasks(req, res) {
  try {
    const tasks = await Task.find().sort({ create_at: -1 });

    if (!tasks) {
      res.status(400).send({ msg: "Error: Cannot get tasks" });
    } else {
      res.status(200).send(tasks);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

//Get specific task
async function getTask(req, res) {
  const taskId = req.params.id;

  try {
    const task = await Task.findById(taskId);

    if (!task) {
      res.status(400).send({ msg: "Error: Task doesn't exists" });
    } else {
      res.status(200).send(task);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

function putTask(req, res) {
  const taskId = req.params.id;
  const params = req.body;

  try {
    Task.findById(taskId, (err, taskData) => {
      if (err) {
        res.status(500).send({ msg: "Server status error" });
      } else {
        if (!taskData) {
          res.status(400).send({ msg: " Error: Task doesn't exists" });
        } else {
          // recover params which will be modified
          taskData.name = params.name;
          taskData.description = params.description;

          //If there is no error update task
          Task.findByIdAndUpdate(taskId, taskData, (err, result) => {
            if (err) {
              res.status(404).send({ msg: err });
            } else if (!result) {
              res.status(404).send({ msg: "Error: task doesn't exists" });
            } else {
              res.status(201).send({ task: taskData });
            }
          });
        }
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
}

async function deleteTask(req, res) {
  const taskId = req.params.id;

  try {
    const task = await Task.findByIdAndDelete(taskId);

    if (!task) {
      res.status(400).send({ msg: "Error: Task doesn't exists" });
    } else {
      res.status(200).send({ msg: "Task successfully deleted" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

function changeTask(req, res) {
  // recuperar id de la tarea:
  const taskId = req.params.id;

  try {
    Task.findById(taskId, (err, taskData) => {
      if (err) {
        res.status(500).send({ msg: "Server status error" });
      } else {
        if (!taskData) {
          res.status(400).send({ msg: "Error: Task doesn't exists" });
        } else {
          taskData.is_complete = true;
          taskData.date_finish = Date.now();

          //Change task status to complete
          Task.findByIdAndUpdate(taskId, taskData, (err, result) => {
            if (err) {
              res.status(404).send({ msg: err });
            } else if (!result) {
              res.status(404).send({ msg: "Error: user doesn't exists" });
            } else {
              res.status(201).send({ task: taskData });
            }
          });
        }
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  getTasks,
  postTask,
  getTask,
  putTask,
  deleteTask,
  changeTask,
};
