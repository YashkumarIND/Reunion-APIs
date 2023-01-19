const express = require("express");
const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const usersroute = require("./routes/user");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const followRoute = require("./routes/follow");
const unfollowRoute = require("./routes/unfollow");
const commentRoute = require("./routes/comment");

mongoose.connect(
    'mongodb://localhost:27017/social',()=>{
      console.log("MongoDB Connected!")
    }
);

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/auth",authRoute);
app.use("/api/users", userRoute);
app.use("/api/user",usersroute)
app.use("/api/follow", followRoute);
app.use("/api/unfollow", unfollowRoute);
app.use("/api/posts", postRoute);
app.use("/api/comment", commentRoute);

app.listen(5000, () => {
  console.log("Backend server is running!");
});