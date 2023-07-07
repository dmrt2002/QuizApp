const express = require("express");
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
require('dotenv').config();
app.use(express.urlencoded({ extended: true}));

//configure database and mongoose
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
})
.then(() => console.log('connected to db'))
.catch(err => console.log(err))
// db configuaration ends here

//registering cors
app.use(cors());

const adminRoutes = require("./routers/admins.js")
app.use("/api/admins", adminRoutes);
const userRoutes = require("./routers/users.js")
app.use("/api/users", userRoutes);

app.use(express.static(__dirname));
app.get("*" , (req,res) => {
  res.sendFile(__dirname + "/index.html");
});


app.listen(PORT, () => {
  console.log(`App is running on`, PORT);
});