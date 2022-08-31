import cryto from "crypto-js";
import user from "../Data/user.js";

export default (req, res) => {
  const { password, login } = user;
  const { login: l, password: p } = req.body;

  /**
   * Pour la gestion de l'authentification on utlisera les sessions
   */

  req.session.auth = false;

  // CryptoJS le password est déjà hasher dans les données utilisateur
  if (cryto.SHA1(p).toString() === password && login === l) {
    req.session.auth = true;
  }

  if (req.session.auth) {
    res.redirect("/dashboard");

    return;
  }

  req.session.message = "Attention vous n'êtes pas authentifié";
  res.redirect("/");
};
