import express from "express";
import cors from "cors";
import connectDatabase from "./database/db";
import dotenv from "dotenv";

dotenv.config();
//intialize app
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//connecting database
connectDatabase();
export default app;
