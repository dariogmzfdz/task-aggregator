const Task = require('../Models/taskModel');

async function postTask(req,res, next){

    const task = new Task();
    // const params = req.body;
    // task.name= params.name;
    // task.description= params.description;
    const {name, description, is_complete, date_created, date_finish} = req.body;
    try{
        // const taskStore = await task.save();
         const taskStore= await task.create({
        name: name,
        description: description,
        is_complete: is_complete,
        date_created: date_created,
        date_finish: date_finish

    });
        if (!taskStore) {
            res.status(400).send({msg: "Error: can not create task"});

        }else{
            res.status(201).send({task: taskStore});
        }

     }catch (error){
        res.status(500).send(error);
    }
    
}


function getTasks(req,res){
    res.status(200).send({msg: "Task Controller it's OK"})
}

module.exports={getTasks, postTask}