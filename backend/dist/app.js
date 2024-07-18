import express from "express";
import cookieparser from "cookie-parser";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cors from "cors";
config();
const app = express();
app.use(cors({
    origin: true,
    credentials: true,
}));
app.use(express.json());
app.use(cookieparser(process.env.COOKIE_SECRET));
// remove the following line in production
app.use(morgan("dev"));
app.use("/api/v1", appRouter);
export default app;
//# sourceMappingURL=app.js.map