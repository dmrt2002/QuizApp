const mongoose = require("mongoose");
const resultSchema = mongoose.Schema({
  quizId: {
    type: String,
  },
  userId: {
    type: String
  },
  percentage: {
    type: String,
  }
});

const Results = mongoose.model("results", resultSchema, "results");
module.exports = Results