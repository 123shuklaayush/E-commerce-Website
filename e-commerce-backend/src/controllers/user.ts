import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.js";
import { NewUserRequestBody } from "../types/types.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "../middlewares/error.js";


export const newUser = TryCatch( async(
    req: Request<{}, {}, NewUserRequestBody>, 
    res: Response, 
    next: NextFunction
    ) => {

        const{name,email,photo,gender, _id, dob} = req.body;

        let user = await User.findById(_id);
        if(user) return res.status(200).json({ 
            success: true,
            message: `Welcome back ${user.name}`,
        });

        if(!_id || !name || !email|| !photo || !gender || !dob) next(new ErrorHandler("Please add all  fields", 400)
            )
        user = await User.create({
            name,
            email,
            photo,
            gender,
            _id, 
            dob: new Date(dob),
        });
        return res.status(201).json({
            success: true,
            message: `Welcome ${user.name}`,
        })
    }
)


export const getAllUsers = TryCatch( async(req, res, next) => {
    const users = await User.find({});

    return res.status(200).json({
        success: true,
        users,
    })
})
interface Params {
    id: string;
}

export const getAllUser = TryCatch( async(req, res, next) => {
    const{ id }  = req.params as Params 
    const user = await User.findById(id);

    if(!user) return next(new ErrorHandler("User not found", 404))

    return res.status(200).json({
        success: true,
        user,
    })
})

export const deleteUser = TryCatch( async(req, res, next) => {
    const{ id }  = req.params as Params 
    const user = await User.findById(id);

    if(!user) return next(new ErrorHandler("Invalid Id", 404))

    await user.deleteOne()

    return res.status(200).json({
        success: true,
        message: "User Deleted Successfully"
    })
})


