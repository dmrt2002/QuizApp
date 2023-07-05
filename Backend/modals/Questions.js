const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  adminId: {
    type: String,
  },
  questions: {
    type: Array,
  },
  title: {
    type: String,
  }
});

const Questions = mongoose.model("questions", userSchema, "questions");
module.exports = Questions