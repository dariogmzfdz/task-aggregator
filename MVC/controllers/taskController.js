const Task = require("../Models/taskModel");
const authMiddleware = require("../Middleware/authMiddleware");

async function postTask(req, res) {
  // recuperar usuario actual a través del token:
  const user = await authMiddleware.getUser(req, res);

  const task = new Task();
  const params = req.body;

  task.name = params.name;
  task.description = params.description;
  // añadir el owner:
  task.owner = user.id;

  try {
    const taskStore = await task.save();

    if (!taskStore) {
      res.status(400).send({ msg: "Error: cannot create task" });
    } else {
      res.status(201).send({ task: taskStore });
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

async function getTasks(req, res) {
  // recuperar usuario actual a través del token:
  const user = await authMiddleware.getUser(req, res);

  try {
    const tasks = await Task.find({ owner: user.id }).sort({ create_at: -1 });

    if (!tasks) {
      res.status(400).send({ msg: "Error: Cannot get tasks" });
    } else {
      res.status(200).send(tasks);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

async function getTask(req, res) {
  const taskId = req.params.id;
  // recuperar usuario actual a través del token:
  const user = await authMiddleware.getUser(req, res);

  try {
    const task = await Task.findById(taskId);

    if (!task) {
      res.status(400).send({ msg: "Error: Task doesn't exists" });
    } else if (task.owner != user.id) {
      // añadir validación para comprobar que somos el propietario sino dará 403:
      res
        .status(403)
        .send({
          msg: "Forbidden - Access to this resource on the server is denied!",
        });
    } else {
      res.status(200).send(task);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

// convertir esta función en asincrona para el middleware:
async function putTask(req, res) {
  const taskId = req.params.id;
  const params = req.body;
  // recuperar usuario actual a través del token:
  const user = await authMiddleware.getUser(req, res);

  try {
    Task.findById(taskId, (err, taskData) => {
      if (err) {
        res.status(500).send({ msg: "Server status error" });
      } else {
        if (!taskData) {
          res.status(400).send({ msg: "Error: Task doesn't exists" });
        } else {
          taskData.name = params.name;
          taskData.description = params.description;

          Task.findByIdAndUpdate(taskId, taskData, (err, result) => {
            if (err) {
              res.status(404).send({ msg: err });
            } else if (!result) {
              res.status(404).send({ msg: "Error: task doesn't exists" });
            } else if (taskData.owner != user.id) {
              // añadir validación para comprobar que somos el propietario sino dará 403:
              res
                .status(403)
                .send({
                  msg: "Forbidden - Access to this resource on the server is denied!",
                });
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
  // recuperar usuario actual a través del token:
  const user = await authMiddleware.getUser(req, res);

  try {
    // mejorar la seguridad a la hora de eliminar con un callback:
    Task.findById(taskId, (err, taskData) => {
      if (err) {
        res.status(500).send({ msg: "Server status error" });
      } else {
        if (!taskData) {
          res.status(400).send({ msg: "Error: Task doesn't exists" });
        } else if (taskData.owner != user.id) {
          // añadir validación para comprobar que somos el propietario sino dará 403:
          res
            .status(403)
            .send({
              msg: "Forbidden - Access to this resource on the server is denied!",
            });
        } else {
          Task.findByIdAndDelete(taskId, (err, result) => {
            if (err) {
              res.status(500).send({ msg: "Server status error" });
            } else if (!result) {
              res.status(404).send({ msg: "Error: task doesn't exists" });
            } else {
              res.status(200).send({ msg: "Task successfully deleted" });
            }
          });
        }
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
}

// convertir esta función en asíncrona:
async function changeTask(req, res) {
  const taskId = req.params.id;
  // recuperar usuario actual a través del token:
  const user = await authMiddleware.getUser(req, res);

  try {
    Task.findById(taskId, (err, taskData) => {
      if (err) {
        res.status(500).send({ msg: "Server status error" });
      } else {
        if (!taskData) {
          res.status(400).send({ msg: "Error: Task doesn't exists" });
        } else if (taskData.owner != user.id) {
          // añadir validación para comprobar que somos el propietario sino dará 403:
          res
            .status(403)
            .send({
              msg: "Forbidden - Access to this resource on the server is denied!",
            });
        } else {
          taskData.is_complete = true;
          taskData.date_finish = Date.now();
          Task.findByIdAndUpdate(taskId, taskData, (err, result) => {
            if (err) {
              res.status(404).send({ msg: err });
            } else if (!result) {
              res.status(404).send({ msg: "Error: task doesn't exists" });
            } else if (taskData.owner != user.id) {
              // añadir validación para comprobar que somos el propietario sino dará 403:
              res
                .status(403)
                .send({
                  msg: "Forbidden - Access to this resource on the server is denied!",
                });
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
