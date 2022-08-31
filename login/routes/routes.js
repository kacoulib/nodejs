import express from "express";
const router = express.Router();

import HomeController from "../controllers/home.js";
import LoginController from "../controllers/login.js";
import DashboardController from "../controllers/dashboard.js";

import authMiddleware from "../middleware/auth.js";

router.get("/", HomeController);
router.post("/login", LoginController);
router.get("/dashboard", authMiddleware, DashboardController);

router.get("/logout", (req, res) => {
  req.session.auth = false;

  res.redirect("/");
});

export default router;
