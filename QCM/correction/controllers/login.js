import User from "../Models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default (req, res) => {
  // messages, validators
  let messages = [],
    old = { email: "" };

  if (req.method === "GET") {
    res.render("home/login", { messages, old });

    return;
  }

  const { email, password } = req.body;

  // gestion des erreurs

  if (!email) {
    messages.push({ message: "Email required", title: "Email" });
  } else {
    old.email = email;
  }

  if (!password) {
    messages.push({ message: "Password required", title: "Password" });
  } else {
    old.password = "";
  }

  if (messages.length > 0) {
    res.render("home/login", { messages, old });

    return;
  }

  // On vérifie que l'utlisateur est dans la base
  let firstName, _id;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        res.render("home/login", {
          messages,
          old,
          message: "You are not logged ",
        });
      }
      firstName = user.firstName;
      _id = user._id;

      return bcrypt.compare(password, user.password);
    })
    .then((response) => {
      if (!response) {
        messages.push({ message: "Problem authentification" });
        res.render("home/login", {
          messages,
          old,
        });

        return;
      }
      req.flash("flash_message", `You are now logged, ${firstName} `);

      req.session.token = jwt.sign(
        { userId: _id },
        "RANDOM_TOKEN_SECRET",
        { expiresIn: "24h" }
      );

      req.session.userId = _id;

      return res.redirect("/dashboard");
    });
};
