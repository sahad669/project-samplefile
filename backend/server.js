import express from "express";
import dotenv from "dotenv";
import connect from "./config/connectDB.js"
import cors from "cors";
import departmentRouter from './routes/departmentRouter.js'
import userRouter from "./routes/userRouter.js"
import upload from "./middleware/multer.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/department",departmentRouter)
app.use("/api/users",userRouter)

connect();
app.listen(process.env.PORT, () => {
  console.log("server started");
});


app.post("/employee-image", upload.single("image"), (req, res) => {
  try {
    res.json({
      success: true,
      url: req.file.path,       
      public_id: req.file.filename, 
    });
  } catch (error) {
    console.error("Upload error", error);
    res.status(500).json({ success: false, error: "Upload failed" });
  }
});