import express from "express";
import cors from 'cors';
import { deleteUser, addUser, getAllUsers, updateUser, login, getBookingOfUser } from "../controllers/user-controllers.js";
const app = express();
const userRouter = express.Router();

userRouter.get("/",cors(), getAllUsers);
userRouter.post("/signup",cors(), addUser);
userRouter.put("/:id",cors(), updateUser);
userRouter.delete("/:id",cors(), deleteUser);
userRouter.post("/login",cors(), login);
userRouter.get("/bookings/:id",cors(), getBookingOfUser);

export default userRouter;