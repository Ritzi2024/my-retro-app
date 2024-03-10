const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
    text: String
});

module.exports = mongoose.model("Task", taskSchema);