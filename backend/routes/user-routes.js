import express from "express";
import { deleteUser, addUser, getAllUsers, updateUser, login, getBookingOfUser } from "../controllers/user-controllers.js";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup", addUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.post("/login", login);
userRouter.get("/bookings/:id", getBookingOfUser);

export default userRouter;