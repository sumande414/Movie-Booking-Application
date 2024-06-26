import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/user-routes.js";
import adminRouter from "./routes/admin-routes.js";
import movieRouter from "./routes/movie-routes.js";
import bookingsRouter from "./routes/booking-routes.js";
dotenv.config();
const app = express();

//middlewares
app.use(express.json());
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/movie", movieRouter);
app.use("/booking", bookingsRouter);

mongoose.connect(
        `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.igoejfa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
).then(()=>
    app.listen(5000, ()=> {
        console.log(`Connected to Local Host Port ${5000}`);
    })
).catch((e)=>console.log(e));





