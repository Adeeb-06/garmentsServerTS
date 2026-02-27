import { model, models, Schema } from "mongoose";
import { IUser } from "./user.type";

const userSchema = new Schema<IUser>({
    name: String,
    email: String,
    photoURL: String,
    role: String,
    status: String,
});

export const User = models.User || model<IUser>("User", userSchema);