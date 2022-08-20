import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import jobsRoute from "./routes/jobs.js";
const app = express();
dotenv.config();

const port = process.env.PORT;

// middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.get("/", (req, res) => {
  res.json("Welcome to your jobs api");
});

app.use("/api/jobs", jobsRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";

  return res.status(errorStatus).json({
    status: errorStatus,
    success: false,
    message: errorMessage,
    stack: err.stack,
  });
});

// db

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to db...");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected!");
});

mongoose.connection.off("disconnected", () => {
  console.log("MongoDB disconnected!");
});

app.listen(port, () => {
  connect();
  console.log(`Server running on port ${port}`);
});
