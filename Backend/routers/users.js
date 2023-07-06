const express = require("express");
const router = express.Router();
const userController = require("../controllers/usercontroller");
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json()

router.post("/login", jsonParser, userController.userLogin);
router.post("/questions", jsonParser, userController.getQuestions);
router.post("/results", jsonParser, userController.storeResult);

module.exports = router;