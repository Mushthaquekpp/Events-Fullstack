import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import eventRoutes from "./routes/eventRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

app.use("/api/events", eventRoutes);

const mongodb = () => {
  mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("database connected");
  });
};

app.listen(process.env.PORT, () => {
  console.log(`port running on ${process.env.PORT}`);
  mongodb();
});
