import { Request, Response } from "express";
import { User } from "./user.model";

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, photoURL, role } = req.body;
        if (!name || !email || !photoURL) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        const user = {
            name,
            email,
            photoURL,
            role,
            status: "pending",
        };
        await User.create(user);
        res.status(201).json({ message: "User Registered" });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const upsertUser = async (req: Request, res: Response) => {
    try {
        const { name, email, photoURL, role } = req.body;
        if (!name || !email || !photoURL) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }
        const user = User.findOne({ email });
        if (!user) {
            const newUser = {
                name,
                email,
                photoURL,
                role,
                status: "pending",
            };
            await User.create(newUser);
            res.status(201).json({ message: "User Registered" });
        } else {
            res.status(200).json({ message: "Logged in" });
        }   
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const getUserByMail = async (req: Request, res: Response) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json(user);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}