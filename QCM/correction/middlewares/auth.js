import jwt from "jsonwebtoken";

export default (req, res, next) => {
  jwt.verify(req.session.token, "RANDOM_TOKEN_SECRET", (err, decode) => {
    if (
      typeof decode === "undefined" ||
      (req.session.userId && req.session.userId !== decode.userId)
    ) {
      req.flash("flash_message", "error authentification");
      
      res.redirect('/login');

      return;
    }
    next();
  });
};
