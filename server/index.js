// import library
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

//import filepaths
const dataBaseConnection = require("./config/db");
const { authRouter } = require("./routes/authRoute");
const { userRouter } = require("./routes/userRoute");
const { postRouter } = require("./routes/postRoute");
const { categoryRouter } = require("./routes/categoryRoute");
const { commentRouter } = require("./routes/commentRoute");
const PORT = process.env.PORT;

// INITIALIZE EXPRESS APP
const app = express();
app.use(cors());
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "/images")));

// ROOT ROUTE
app.get("/", (req, res) => {
  res.json("welcome to sh blog");
});
// ULOADING PHOTO
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});
// SETTING ROUTERS
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/comments", commentRouter);

app.listen(PORT, async () => {
  try {
    console.log("Connecting with database...");
    await dataBaseConnection;
    console.log("Connected with database.");
    console.log(`server running on port:${PORT}`);
  } catch (err) {
    console.log("Database connection failed");
    console.log("Data base connection error: ", err.message);
  }
});
