import User from "../Models/User";
import bcrypt from "bcryptjs";

export default (req, res) => {
  const { firstName, lastName, email, password, passwordConfirm } = req.body;

  // messages, validators
  let messages = [],
    old = { firstName: "", lastName: "", email: "" };

  if (!firstName) {
    messages.push({
      type: "error",
      message: "FirstName required",
      title: "FirstName",
    });
  } else {
    old.firstName = firstName;
  }

  if (!lastName) {
    messages.push({
      type: "error",
      message: "LastName required",
      title: "LastName",
    });
  } else {
    old.lastName = lastName;
  }

  if (!email) {
    messages.push({
      type: "error",
      message: "Email required",
      title: "Email",
    });
  } else {
    old.email = email;
  }

  if (!password) {
    messages.push({
      type: "error",
      message: "Password required",
      title: "Password",
    });
  }

  if (!passwordConfirm) {
    messages.push({
      type: "error",
      message: "PasswordConfirm required",
      title: "PasswordConfirm",
    });
  }

  if (password !== passwordConfirm) {
    messages.push({
      type: "error",
      message: "Password fields don't match",
      title: "Password",
    });
  }

  if (messages.length > 0) {
    console.log(messages);
    res.render("home/index", { messages, old });

    return;
  }

  // create Object User
  const newUser = new User({
    firstName,
    lastName,
    email,
    password,
  });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      newUser.password = hash;

      // On vérifie au préalable que l'utilisateur n'existe pas déjà
      User.findOne({ email : email }).then((doc) => {
        if (doc) {
          messages.push({
            type: "error",
            message: "This user already exists",
            title: "Already exists",
          });

          res.render("home/index", { messages, old });
        } else {
          newUser.save().then((user) => {
            req.flash("flash_message", "You are now registered, please login");

            res.redirect("/login");
          });
        }
      });
    });
  });
};
