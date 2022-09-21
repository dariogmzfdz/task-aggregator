const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

const TaskSchema = Schema({
  name: {
    type: "string",
    required: true,
  },
  description: {
    type: "string",
    required: true,
  },
  is_complete: {
    type: Boolean,
    //required: true,
    default: false,
  },
  is_important:{
    type: Boolean,
   // required: true,
    default: false,
  },
  date_created: {
    type: Date,
   // required: true,
    default: new Date(),
  },
  date_finish: {
    type: Date,
   // required: true,
    default: null,
  },
  owner: { // creates owner parameter and transforms it in type ObjectId
    type: ObjectId,
    require: true,
}
});
const Tasks = mongoose.model("tasks", TaskSchema);
module.exports = Tasks;
