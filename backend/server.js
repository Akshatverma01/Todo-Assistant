import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import todoRoutes from "./src/routes/todo.Routes.js"
import summarizeRoute from "./src/routes/summarize.route.js"

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(cors({
    origin: "https://todo-assistant-rho.vercel.app",
    credentials: true,
  }));

app.use("/todo", todoRoutes);
app.use("/summarize", summarizeRoute)

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});


export default app;
