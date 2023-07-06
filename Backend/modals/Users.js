const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  score: {
    type: String
  },
  quizId: {
    type: String
  }
});

const Users = mongoose.model("users", userSchema, "users");
module.exports = Users