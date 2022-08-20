import Job from "../models/Job.js";
import mongoose from "mongoose";

export const createJob = async (req, res, next) => {
  const { title, description, company, ...otherDetails } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!description) {
    emptyFields.push("description");
  }
  if (!company) {
    emptyFields.push("company");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  try {
    const savedJob = await Job.create({
      title,
      description,
      company,
      ...otherDetails,
    });
    res.status(201).json({
      status: 201,
      data: savedJob,
      message: "Success",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllJobs = async (req, res, next) => {
  const { title, company, expertise, full_time, city } = req.query;
  //   const query = req.query;

  try {
    const jobs = await Job.find();
    // const jobs = await Job.find({ query });
    // const jobs = await Job.aggregate([{ $filter: { title: { $eq: title } } }]);
    // const jobs = await Job.find({ title: { $eq: title } });

    res.status(200).json({
      status: 200,
      data: jobs,
      message: "success",
    });
  } catch (error) {
    next(error);
  }
};

export const getJob = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({
        status: 404,
        error: "Invalid job id",
        message: "Error",
      });
    }

    const job = await Job.findById(req.params.id);

    res.status(200).json({
      status: 200,
      data: job,
      message: "success",
    });
  } catch (error) {
    next(error);
  }
};
