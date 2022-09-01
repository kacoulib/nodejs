import express from "express";
import { ProductModel } from "./Product.js";

const router = express.Router();

router.get("/", getStats);
router.get("/all", getAll);
router.get("/delete/:name", getDelete);
router.get("/show/:name", getShow);

async function getStats(req, res) {
  try {
    const nbDocuments = await ProductModel.find({}).countDocuments();

    res.status(200).json({
      status: "success",
      stats: {
        nbDocuments,
      },
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
}

async function getAll(req, res) {
  try {
    const docs = await ProductModel.find({}, { society: 1, _id: 0, qty: 1 });
    res.status(200).json({ status: "success", data: docs });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
}

async function getDelete(req, res) {
  const { name } = req.params;

  try {
    await ProductModel.deleteOne({ society: name });
    res.status(200).json({ status: "success", removed: name });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
}

async function getShow(req, res) {
  const { name } = req.params;
  try {
    const docs = await ProductModel.find(
      { society: name },
      { society: 1, _id: 0, qty: 1 }
    );
    res.status(200).json({ status: "success", data: docs });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
}

export default router;
