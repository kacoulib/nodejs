import express from "express";
const router = express.Router();

import HomeController from "../controllers/home";
import RegisterController from "../controllers/register";
import LoginController from "../controllers/login";
import DashboardController from "../controllers/dashboard";

import authMiddleware from '../middlewares/auth';

router.get("/", HomeController);
router.post('/register', RegisterController);
router.all('/login', LoginController);

router.get('/dashboard',authMiddleware,  DashboardController);

export default router;