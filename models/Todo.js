const mongoose = require("mongoose");
const { Schema } = mongoose;
const taskSchema = require("./Task");

const todoSchema = new Schema({
  id: String,
  title: String,
  category: String,
  criteria: String,
  description: String,
  createdAt: String,
  updatedAt: String,
  resolutionDate: String,
  convertedDate: String,
  completed: Boolean,
  star: Boolean,
  tasks: [String]
});

module.exports = mongoose.model("Todo", todoSchema);