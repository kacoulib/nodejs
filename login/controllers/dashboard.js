import { getViewsPath } from "../utils/utils.js";

export default (req, res) => {
  res.sendFile("dashboard.html", { root: getViewsPath() });
};
