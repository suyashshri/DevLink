import express from "express";
import cors from "cors";
import userRouter from "./routes/user";
import gitHubRouter from "./routes/gitHub";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";

dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());
app.use(clerkMiddleware());
app.use(express.json());
app.use("api/v1/user", userRouter);
app.use("api/v1/github", gitHubRouter);

app.listen(PORT, () => {
  console.log(`BE server is running at PORT ${PORT}`);
});
