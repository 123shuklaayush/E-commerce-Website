import express from 'express'
import userRoutes from './routes/user.js'
import { connectDB } from './utils/features.js';
import { errorMiddleware } from './middlewares/error.js';

const port= 3000;

const app = express()
connectDB()
app.use(express.json())
app.get("/" , (req,res) => {
    res.send("Hello World")
})

//Using Routes
app.use('/api/v1/user', userRoutes)

app.use(errorMiddleware)

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
    
})