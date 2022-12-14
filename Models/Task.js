const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  time: { type: String, required: true },
  date: { type: String, required: true },
  reminder: { type: Boolean, required: true },
});

module.exports = mongoose.model("Task", taskSchema);
