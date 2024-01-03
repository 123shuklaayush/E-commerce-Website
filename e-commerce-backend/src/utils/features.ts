import mongoose from 'mongoose';


export const connectDB = () => {
    mongoose.connect("mongodb://localhost:27017", {
        dbName: "Ecommerce_24",
    })
    .then((c) => console.log(`DB Connected to ${c.connection.host}`))
    .catch((error) => console.log(error));
}