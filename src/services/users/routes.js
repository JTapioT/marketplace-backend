import express from "express";
import userHandler from "./handlers.js";

const userRouter = express.Router();

userRouter.get("/", userHandler.getUsers);
userRouter.post("/", userHandler.newUser);
userRouter.route("/:id")
.get(userHandler.getUser)
.put(userHandler.updateUser)
.delete(userHandler.deleteUser)


export default userRouter;