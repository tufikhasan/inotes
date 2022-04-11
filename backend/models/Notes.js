const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotesSchema = new Schema({
  //Get users objectedId
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", //refference schema user model name
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: "General",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("notes", NotesSchema);
