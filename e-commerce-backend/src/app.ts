import express from 'express'
import { connectDB } from './utils/features.js';
import { errorMiddleware } from './middlewares/error.js';
import NodeCache from 'node-cache';
import { config } from 'dotenv';
import morgan from 'morgan';
import Stripe from 'stripe';
import cors from 'cors'
// Routes
import userRoutes from './routes/user.js'
import productRoutes from './routes/products.js';
import orderRoutes from './routes/order.js';
import paymentRoutes from './routes/payment.js'
import dashboardRoutes from './routes/stats.js'
import { singleUpload } from './middlewares/multer.js';
import path from 'path';
config()
console.log(process.env.PORT);

const port= process.env.PORT || 3000;

const app = express()
const mongoURI = process.env.MONGO_URI || ""
const stripeKey = process.env.STRIPE_KEY || ""

connectDB(mongoURI)
export const stripe =  new Stripe(stripeKey)
export const myCache = new NodeCache()

app.use(express.json())
app.use(morgan("dev"))
app.use(cors())
app.get("/" , (req,res) => {
    res.send("Hello World")
})

const __dirname = path.resolve()

const uploadsPath = path.join(__dirname, "../uploads")
app.use("/uploads", express.static(uploadsPath))

//Using Routes
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/product', productRoutes)
app.use('/api/v1/order', orderRoutes) 
app.use('/api/v1/payment', paymentRoutes)
app.use('/api/v1/dashboard', dashboardRoutes)

// app.use("/uploads", express.static("uploads"))
app.use(errorMiddleware)

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
    
})