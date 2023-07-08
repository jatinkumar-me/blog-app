import { Schema, model, Types } from "mongoose";

export interface IBlog {
    userId: Types.ObjectId;
    content: Object;
}

const blogSchema = new Schema<IBlog>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        content: {
            type: Object,
            required: true,
            default: {},
        },
    },
    {
        timestamps: true,
    }
);

const Blog = model<IBlog>("Blog", blogSchema);

export default Blog;
