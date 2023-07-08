import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

export const register = async (req: Request, res: Response) => {
    try {
        const { fullName, email, password }: IUser = req.body;
        if (await User.exists({ email }))
            return res.status(409).json({ message: "User already exists" });
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });
        const savedUser: Partial<IUser> = await newUser.save();
        delete savedUser.password;
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password }: Exclude<IUser, "fullName"> = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });
        const isMatch: boolean = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Unauthorized" });
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET ?? "JWT_SECRET"
        );
        res.status(200).json({ token, _id: user._id });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};
