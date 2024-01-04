import express from 'express'
import { deleteProduct, getAdminProducts, getAllCategories, getAllProducts, getLatestProducts, getSingleProduct, newProduct, updateProduct } from '../controllers/product.js';
import { singleUpload } from '../middlewares/multer.js';
import { adminOnly } from '../middlewares/auth.js';


const app = express.Router();

// route - /api/v1/product/new - To create New Product
app.post("/new", adminOnly, singleUpload , newProduct)

// route - /api/v1/product/latest - To get latest products top 5
app.get("/latest", getLatestProducts)


// route - /api/v1/product/all - To get all products with filter
app.get("/all", getAllProducts)


// route - /api/v1/product/categories - To get all categories
app.get("/categories", getAllCategories)

// route - /api/v1/product/admin-products - To get all products for admin
app.get("/admin-products", adminOnly, getAdminProducts)

// route - /api/v1/product/DynamicID - To get single product
app.route("/:id")
.get(getSingleProduct)
.put(adminOnly, singleUpload, updateProduct)
.delete(adminOnly, deleteProduct)


export default app;