const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PhilosopherSchema = new Schema({
  name: String,
  school: String
});

module.exports = mongoose.model("g-philosopher", PhilosopherSchema);
