import express from 'express';
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from 'dotenv';
import connectDB from './utils/db.js';



dotenv.config();
connectDB();

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());



app.use(cors());


const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    
  console.log(`Server running on port ${PORT}`);
});