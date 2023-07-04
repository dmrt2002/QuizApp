const express = require("express");
const router = express.Router();
const userController = require("../controllers/usercontroller");
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json()

router.post("/login", jsonParser, userController.adminLogin);
router.post("/register", jsonParser, userController.registerAdmins);

module.exports = router;