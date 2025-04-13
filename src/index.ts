/** @format */
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouts from "./routs/userRouts";
import eventRouts from "./routs/eventRouts";
import achivementRouts from "./routs/achivementRouts";
import bookingRouts from "./routs/bookingRouts";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL || "";

app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Server is running");
});
app.get("/info", async (req, res) => {
  res.send({
    PORT: PORT,
    NODE_ENV: process.env.ENV,
    DATABASE_URL: process.env.DB_URL,
  });
});

// routes
app.use("/api/v1/users", userRouts);
app.use("/api/v1/events", eventRouts);
app.use("/api/v1/achivements", achivementRouts);
app.use("/api/v1/dateBooking", bookingRouts);

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log(`🌎 | App Started on  http://localhost:${PORT}`);
  })
  .catch((error: any) => {
    console.log("Error occurred while connecting to database", error);
  });

app
  .listen(PORT, () => {
    console.log(
      `Server is Successfully Running, and App is listening on port ${PORT}`,
    );
  })
  .on("error", (error: any) => {
    console.log("Error occurred, server can't start", error);
  });
