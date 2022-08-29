import fs from "fs";
import express from "express";
import homeController from "../controllers/home.js";
import kittenController from "../controllers/kitten.js";

const router = express.Router();

// Home route
router.get("/", homeController);

// kitten route
// "/:id" = path
// kittenController = controller
router.get("/:id", kittenController);

export default router;
