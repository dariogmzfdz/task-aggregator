const mongoose = require('mongoose');

const Schema= mongoose.Schema;

const TaskSchema = Schema({
    name:{
        type: 'string',
        required: true
    },
    description:{
        type: 'string',
        required: true
    },
    is_complete:{
        type: Boolean,
        //required: true,
        default: false
    },
    date_created:{
        type: Date,
       // required: true,
        default: new Date()
    },
    date_finish:{
        type: Date,
       // required: true,
        default:null
    }

});
module.exports= mongoose.model("tasks", TaskSchema);