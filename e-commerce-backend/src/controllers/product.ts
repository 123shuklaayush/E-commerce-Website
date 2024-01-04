import { TryCatch } from "../middlewares/error.js";
import {NextFunction, Response, Request} from 'express'
import { BaseQuery, NewProductRequestBody, SearchRequestQuery } from "../types/types.js";
import { Product } from "../models/products.js";
import ErrorHandler from "../utils/utility-class.js";
import { rm } from "fs";

export const newProduct = TryCatch(
    async (req:Request<{},{},NewProductRequestBody>, res, next) => {
        const { name, category, price, stock } = req.body;
        const photo = req.file;
        if(!photo) return next(new ErrorHandler("Please Add Photo", 400))

        if(!name || !category || !price || !stock) {
            rm(photo.path, () => {
                console.log("Photo Deleted")
            })
            return next(new ErrorHandler("Please Fill All Fields", 400))
        }

        await Product.create({
            name, 
            price, 
            stock, 
            category: category.toLowerCase(),
            photo: photo.path
        })
        return res.status(201).json({
            success: true,
            message: "Product Created Successfully"
        })
    }
)







export const getLatestProducts = TryCatch(
    async (req, res, next) => {

        const product = await Product.find({}).sort({createdAt: -1}).limit(5)
        
        return res.status(200).json({
            success: true,
            product,
        })
    }
)





export const getAllCategories = TryCatch(
    async (req, res, next) => {
        const categories = await Product.distinct("category")
        return res.status(200).json({
            success: true,
            categories,
        })
    }
)




export const getAdminProducts = TryCatch(
    async (req, res, next) => {

        const products = await Product.find({})
        
        return res.status(200).json({
            success: true,
            products,
        })
    }
)



export const getSingleProduct = TryCatch(
    async (req, res, next) => {
        const product = await Product.findById(req.params.id)
        
        return res.status(200).json({
            success: true,
            product,
        })
    }
)



export const updateProduct = TryCatch(async (req, res, next) => {
        const {id} = req.params; 
        const { name, category, price, stock } = req.body;
        const photo = req.file;
        const product = await Product.findById(id)

        if(!product) return next(new ErrorHandler("Product Not Found", 404))
        if(photo){
            rm(product.photo!, () => {
                console.log("Old Photo Deleted")
            })
            product.photo = photo.path
        }

        if(name) product.name = name
        if(category) product.category = category.toLowerCase()
        if(price) product.price = price
        if(stock) product.stock = stock

        await product.save()

        
        return res.status(200).json({
            success: true,
            message: "Product Updated Successfully"
        })
    }
)




export const deleteProduct = TryCatch(
    async (req, res, next) => {
        const product = await Product.findById(req.params.id)
        if(!product) return next(new ErrorHandler("Product Not Found", 404))
        rm(product.photo!, () => {
            console.log("Product Photo Deleted")
        })
        await product.deleteOne()
        return res.status(200).json({
            success: true,
            message: "Product Deleted Successfully"
        })
    }
)




export const getAllProducts = TryCatch(
    async (req:Request<{},{},{},SearchRequestQuery>, res, next) => {

        const {search, sort, category, price} = req.query

        const page = Number(req.query.page) || 1;

        const limit = Number(process.env.PRODUCTS_PER_PAGE) || 8;
        const skip = (page - 1) * limit;


        const baseQuery: BaseQuery = {
        }

        if(search) baseQuery.name = {
            $regex: search,
            $options: "i",
        }
        if(price) baseQuery.price = {
            $lte: Number(price),
        }
        if(category) baseQuery.category = category 

        const productsPromise = Product.find(baseQuery)
        .sort(sort && { price : sort === "asc" ? 1 : -1 })
        .limit(limit)
        .skip(skip)

        const [products, filterOnlyProduct] = await Promise.all([
            productsPromise,
            Product.find(baseQuery)

        ])

        const totalPage = Math.ceil(filterOnlyProduct.length / limit);
        
        return res.status(200).json({
            success: true,
            products,
            totalPage,
        })
    }
)


