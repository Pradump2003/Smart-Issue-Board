require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db.config");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");
const issueRoutes = require("./routes/issue.routes");
const cors = require("cors");

const app = express();

connectDB();

// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://smart-issue-board-7rz4.vercel.app",
// ];

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://smart-issue-board-7rz4.vercel.app",
    ],
    credentials: true,
  })
);

// app.options(
//   "/.*/",
//   cors({
//     origin: "https://smart-issue-board-wf2v.vercel.app",
//     credentials: true,
//   })
// );

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/issue", issueRoutes);

// app.get("/*", (req, res) => {
//   res.status(200).json({
//     message: "Welcome to the Smart Issue Board API",
//   });
// });

app.listen(process.env.PORT, (err) => {
  if (err) throw err;
  console.log(`Server is running on port ${process.env.PORT}`);
});
