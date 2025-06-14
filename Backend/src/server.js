import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/dbconfig.js";
import userRoutes from './routes/users.js';
import bookRoutes from "./routes/bookRoutes.js"

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.get("/", (req, res) => res.send("API is running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
