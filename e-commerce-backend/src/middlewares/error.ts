import { Response, Request, NextFunction } from "express"

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction)=>{
    err.message ||= "Internal Server Error";
    return res.status(400).json({
        success: false,
        message: err.message,
    })
}