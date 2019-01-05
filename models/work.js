const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkSchema = new Schema({
  title: String,
  desc: String,
  category: [String],
  authorID: String
});

module.exports = mongoose.model("g-Work", WorkSchema);
