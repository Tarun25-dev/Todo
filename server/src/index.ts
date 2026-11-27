import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import todoRoutes from "./routes/todos.js";
import dns from "node:dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

dotenv.config(); // is used to load environment variables from a .env file into your application.

const app = express();
const PORT = process.env.PORT || 5000; //process.env is a bulit-in object in node.js that contains environment variables available to ypur application.

app.use(cors({origin: "http://localhost:5173"}));
// The browser checks whether the backend allows requests from your React application's origin(5173 port).
// If the backend doesn't permit it, the browser blocks the frontend from accessing the response.

app.use(express.json());
app.use("/api/todos", todoRoutes);

async function start(){
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("MongoDB connected");
}

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

start().catch((err) => {
    console.log("Failed to start server:", err);
    process.exit(1);
});