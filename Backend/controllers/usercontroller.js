const Admin = require("../modals/Admin");
const Questions = require("../modals/Questions");

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
          res.status(200).json({ token });
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
