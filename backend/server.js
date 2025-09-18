import express from "express";
import dotenv from "dotenv";
import connect from "./config/connectDB.js"
import cors from "cors";
import departmentRouter from './routes/departmentRouter.js'
import userRouter from "./routes/userRouter.js"

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
