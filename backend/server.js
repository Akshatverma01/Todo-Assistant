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

const options = {
  origin: [
    "https://todo-assistant-rho.vercel.app",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}
app.use(cors(options));

app.use("/todo", todoRoutes);
app.use("/summarize", summarizeRoute)

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});


export default app;
