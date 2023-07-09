import { Schema, model } from "mongoose";

export interface IUser {
    fullName: string;
    email: string;
    password: string;
    blogDraft?: string;
}

const userSchema = new Schema<IUser>({
    fullName: {
        type: String,
        required: true,
        min: 2,
        max: 30,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}"),
    },
    password: {
        type: String,
        required: true,
    },
    blogDraft: {
        type: String,
        required: false,
    }
});

const User = model<IUser>("User", userSchema);

export default User;
