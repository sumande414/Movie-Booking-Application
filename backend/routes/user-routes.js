import express from "express";
import { deleteUser, addUser, getAllUsers, updateUser } from "../controllers/user-controllers.js";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup", addUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser)

export default userRouter;