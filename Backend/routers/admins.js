const express = require("express");
const router = express.Router();
const userController = require("../controllers/usercontroller");
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json()

router.post("/login", jsonParser, userController.adminLogin);
router.post("/register", jsonParser, userController.registerAdmins);
router.post("/quiz/create", jsonParser, userController.createQuiz);
router.post("/quizes", jsonParser, userController.getQuizes);
router.post("/quiz/users", jsonParser, userController.getUsers);
router.post("/quiz/users/marks", jsonParser, userController.getMarks);
module.exports = router;