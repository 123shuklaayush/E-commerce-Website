import { User } from "../models/user.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "./error.js";


// middleware to make sure only admin is allowed

export const adminOnly = TryCatch( async(req, res, next) => {
    const {id} = req.query

    if(!id) return next(new ErrorHandler("Please provide an id", 401))

    const user = await User.findById(id);

    if(!user) return next(new ErrorHandler("User not found", 401))

    if(user.role !== "admin") return next(new ErrorHandler("You are not authorized to access this route", 401))

    next()
    
})