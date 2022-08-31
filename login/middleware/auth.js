export default (req, res, next) => {
  if (req.session.auth) {
    req.session.message = "Bienvenue";
    return next();
  }

  req.session.message = "Attention, vous n'êtes pas connecté !";
  res.redirect("/");
};
