const mongoose = require("mongoose");
const { Schema } = mongoose;

const actionSchema = new Schema({
  title: String,
  taskId: String
})

const actionModel = mongoose.model("RetroAction", actionSchema);
const retroSchema = new Schema({
  id: String,
  date: String,
  convertedDate: String,
  title: String,
  good: [String],
  ok: [String],
  actions:{ 
    type:[actionSchema]
}
});

// module.exports = {
//   retro : mongoose.model("Retro", retroSchema),
//   action : actionModel
// };

module.exports = mongoose.model("Retro", retroSchema);