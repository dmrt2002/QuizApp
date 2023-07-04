const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  }
});
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await Admins.findOne({ email })
  if (user === null) {
    return user;
  }
  if(password === user.password) {
    return user;
  }
};

const Admins = mongoose.model("admins", userSchema, "admins");
module.exports = Admins