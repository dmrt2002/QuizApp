const Admin = require("../modals/Admin");

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
    console.log(req.body)
  }
  catch(e) {
    console.log(e)
  }
}
