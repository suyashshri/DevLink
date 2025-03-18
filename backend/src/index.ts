import express from "express";
import cors from "cors";
import userRouter from "./routes/user";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";

dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());
app.use(clerkMiddleware());
app.use(express.json());
app.use("api/v1/user", userRouter);

app.listen(PORT, () => {
  console.log(`BE server is running at PORT ${PORT}`);
});
