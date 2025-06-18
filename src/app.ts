import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import { connectDB } from "./config/db";
import router from "./routers";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors({ credentials: true }));
app.use(compression());
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/", router());

const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
