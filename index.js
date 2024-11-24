import express from 'express';
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRoute from './routes/userRoutes.js';
import loanRoute from './routes/loanRoutes.js';




dotenv.config();


const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());



app.use(cors());
const corsOptions = {
    origin: 'http//localhost:5173',
    credentials:true
}
app.use(cors(corsOptions));



const PORT = process.env.PORT || 3000;


// creating apis
app.use("/api/h2/user", userRoute);
app.use("api/h2/loan", loanRoute);

// Start the server
app.listen(PORT, () => {
    connectDB();
  console.log(`Server running on port ${PORT}`);
});