require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db.config");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");
const issueRoutes = require("./routes/issue.routes");

const app = express();

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/users", userRoutes); 
app.use("/api/v1/user/issues", issueRoutes);

app.listen(process.env.PORT, (err) => {
  if (err) throw err;
  console.log(`Server is running on port ${process.env.PORT}`);
});
