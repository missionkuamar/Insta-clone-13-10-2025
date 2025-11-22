import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import path from "path";
import connectDB from "./utils/db.js";
 import userRoute from "./routes/user.route.js";
 import postRoute from "./routes/post.route.js";
import messageRoute from "./routes/message.route.js";
import path from "path";
dotenv.config();

const app  = express()

const PORT = process.env.PORT || 3000;



//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
const corsOptions = {
    origin: process.env.URL || "http://localhost:5173", 
    credentials: true,
    methods: 'GET, POST, PUT, DELETE',
}

app.use(cors(corsOptions));
// Define the path to your client build folder
const _dirname = path.resolve();

// API Route
// yha pr apni api ayengi
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/message", messageRoute);


// Serve static files from the 'client/dist' folder
app.use(express.static(path.join(_dirname, 'client', 'dist')));

// Catch-all route to serve index.html for frontend React app (This should be last)
app.use((req, res, next) => {
  res.sendFile(path.join(_dirname, 'client', 'dist', 'index.html'));
});

app.listen(PORT, () => {
connectDB();
    console.log(`Server listen at port ${PORT}`);
});