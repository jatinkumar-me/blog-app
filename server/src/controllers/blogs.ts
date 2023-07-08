import { Request, Response } from "express";
import Blog, { IBlog } from "../models/Blog";
import { AuthenticRequest } from "../middleware/auth";

export const getBlogs = async (_: Request, res: Response) => {
    try {
        const blogs = await Blog.find();
        return res.status(200).json(blogs);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const createBlog = async (req: Request, res: Response) => {
    try {
        const { userId } = (req as AuthenticRequest).payload;
        const { content }: Pick<IBlog, "content"> = req.body;
        const newBlog = new Blog({ userId, content });
        return res.status(201).json(newBlog);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const deleteBlog = async (req: Request, res: Response) => {
    try {
        const { userId } = (req as AuthenticRequest).payload;
        const { blogId } = req.params;
        const blog = await Blog.findById(blogId);
        if (!blog) return res.status(404).json({ message: "Blog not found" });
        if (blog.userId.toString() !== userId)
            return res.status(401).json({ message: "Unauthorized" });
        await Blog.findByIdAndDelete(blogId);
        res.status(203).json({ message: "Deleted one blog" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

export const updateBlog = async (req: Request, res: Response) => {
    try {
        const { userId } = (req as AuthenticRequest).payload;
        const { blogId } = req.params;
        const { content }: Pick<IBlog, "content"> = req.body;
        const blog = await Blog.findById(blogId);
        if (!blog) return res.status(404).json({ message: "Blog not found" });
        if (blog.userId.toString() !== userId)
            return res.status(401).json({ message: "Unauthorized" });
        blog.content = content;
        await blog.save();
        return res.status(200).json(blog);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};
