import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./connection.js";
import adminAPI from "./routes/admin.js";
import blogsAPI from "./routes/blogs.js";
import userAPI from "./routes/user.js";

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 1000;

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  }),
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/blogs", blogsAPI);
app.use("/api/v1/user", userAPI);
app.use("/api/v1/admin", adminAPI);

app.get("/", (_req, res) => {
  res.send("xin chào từ phía server");
});

app.listen(PORT, () => {
  console.log(`server khởi động tại ${process.env.PORT}`);
});
