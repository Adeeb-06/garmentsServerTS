import { Router } from "express";
import { registerUser, getUserByMail, upsertUser } from "./user.controller";

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/google-login", upsertUser);
userRouter.get("/:email", getUserByMail);

export default userRouter;