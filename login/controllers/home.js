import { getViewsPath } from "../utils/utils.js";

export default (req, res) => {
  if (req.session.auth) {
    res.redirect("/dashboard");

    return;
  }

  res.sendFile("login.html", { root: getViewsPath() });
};
