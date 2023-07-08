import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticRequest extends Request {
    payload: UserPayload;
}

export interface UserPayload extends jwt.JwtPayload {
    userId: string;
}

export const verifyToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader)
            return res.status(401).json({ message: "Authorization header missing" });
        const token = authHeader.split(" ")[1];
        if (!token)
            return res.status(401).json({ message: "Authorization denied!" });
        const decoded = jwt.verify(token, process.env.JWT_SECRET ?? "JWT_SECRET");
        if (typeof decoded === "string")
            return res.status(401).json({ message: "Invalid Token" });
        (req as AuthenticRequest).payload = decoded as UserPayload;
        next();
    } catch (err) {
        res.status(500).json({ error: err });
    }
};
