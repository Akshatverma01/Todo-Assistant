import dotenv from "dotenv";
dotenv.config({path: "../.env" });

import express from "express";
import cors from "cors";
import path from "path";
import todoRoutes from "./routes/todo.Routes.js"
import summarizeRoute from "./routes/summarize.route.js"


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/todo", todoRoutes);
app.use("/summarize", summarizeRoute)

// const __dirname = path.resolve();

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//   });
// }


app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});


export default app;
