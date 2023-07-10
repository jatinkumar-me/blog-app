import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import { AuthenticRequest } from "../middleware/auth";

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
    delete (user as Partial<IUser>).password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const saveDraft = async (req: Request, res: Response) => {
  try {
    const { userId } = (req as AuthenticRequest).payload;
    const { content } = req.body;
    console.log(content);
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.blogDraft = content;
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
