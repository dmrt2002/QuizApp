const mongoose = require("mongoose");
const resultSchema = mongoose.Schema({
  quizId: {
    type: String,
  },
  userId: {
    type: Array,
  },
  score: {
    type: String,
  }
});

const Results = mongoose.model("results", resultSchema, "results");
module.exports = Results