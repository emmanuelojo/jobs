import express from "express";
import {
  createJob,
  getAllJobs,
  getJob,
} from "../controllers/jobsController.js";

const router = express.Router();

router.post("/", createJob);
router.get("/", getAllJobs);
router.get("/:id", getJob);

export default router;
