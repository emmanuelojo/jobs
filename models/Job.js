import mongoose from "mongoose";

const JobSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    company: {
      type: Object,
      required: true,
    },
    yearsOfExperience: {
      type: Number,
    },
    stack: {
      type: [String],
    },
    jobType: {
      type: String,
      default: "Full Time",
    },
    remote: {
      type: Boolean,
      default: false,
    },
    expired: {
      type: Boolean,
      default: false,
    },
    salary: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", JobSchema);
