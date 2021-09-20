require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json()); //đọc được dữ liệu body với header: application/json
app.use(cors());

const connectDB = async () => {
  const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@learnit.bcgqs.mongodb.net/learnit?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
connectDB();

const authRouter = require("./src/routes/auth.route");
const postRouter = require("./src/routes/post.route");

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Sever started on port: ${PORT}`);
});
