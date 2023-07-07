const Admin = require("../modals/Admin");
const Questions = require("../modals/Questions");
const Users = require("../modals/Users");
const Results = require("../modals/Results")

exports.registerAdmins = async (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  Admin.create(
      {
        name: name,
        email: email,
        password: password,
      },
      async function (err, user) {
        if (err) {
          res.status(400).json(err);
        } else {
          res.status(200).json({ user });
        }
      }
    );
};

exports.adminLogin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await Admin.findByCredentials(email, password);
    if (user === null) {
      res.status(401).json("Invalid Credentials");
    }
    res.status(200).json({ user });
  } catch (err) {
    res.status(400).json("Incorrect Password");
  }
};

exports.userLogin = async (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var quizId = req.body.quizId;
  Users.create(
      {
        name: name,
        email: email,
        quizId: quizId
      },
      async function (err, user) {
        if (err) {
          res.status(400).json(err);
        } else {
          res.status(200).json({ user });
        }
      }
    );
}

exports.createQuiz = async (req, res) => {
  try {
    let { questions, adminId, quizTitle} = req.body;
    Questions.create({
      adminId: adminId,
      questions: questions,
      title: quizTitle
    }, async function(err, question) {
      if(question) {
        res.status(200).json({ question })
      }
      else if(err) {
        console.log(err)
      }
    })
  }
  catch(e) {
    console.log(e)
  }
}

exports.getQuestions = async (req, res) => {
  let quizId = req.body.id;
  let questions = await Questions.findOne({ _id: quizId })
  if(questions) {
    res.status(200).json({ questions })
  }
}

exports.storeResult = async (req, res) => {
  let { quizId, userId, percentage} = req.body;
  Results.create({
    userId: userId,
    quizId: quizId,
    percentage: percentage
  }, async function (err, user) {
    if(err) {
      console.log(err)
    }
    else {
      res.status(200)
    }
  })
}

exports.getQuizes = async(req,res) => {
  let id = req.body.id;
  let quizes = await Questions.find({ adminId: id })
  res.status(200).json({quizes})
}

exports.getUsers = async(req,res) => {
  let id = req.body.id;
  let users = await Users.find({ quizId: id })
  res.status(200).json({ users })
}

exports.getMarks = async(req,res) => {
  let id = req.body.id;
  let result = await Results.findOne({ userId: id })
  res.status(200).json( { result } )
}

exports.getQuizCount = async (req, res) => {
  let id = req.body.id;
  let users = await Users.find({ quizId: id});
  res.status(200).json({ count: users.length })
}

