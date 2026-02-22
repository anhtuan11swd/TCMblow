import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./connection.js";

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 1000;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("xin chào từ phía server");
});

app.listen(PORT, () => {
  console.log(`server khởi động tại ${process.env.PORT}`);
});
