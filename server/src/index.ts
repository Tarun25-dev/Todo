import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import todoRoutes from "./routes/todos.js";

dotenv.config(); // is used to load environment variables from a .env file into your application.

const app = express();
const PORT = process.env.PORT || 5000; //process.env is a bulit-in object in node.js that contains environment variables available to ypur application.

app.use(cors({origin: "http://localhost:5173"}));
// The browser checks whether the backend allows requests from your React application's origin(5173 port).
// If the backend doesn't permit it, the browser blocks the frontend from accessing the response.

app.use(express.json());
app.use("/api/todos", todoRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
