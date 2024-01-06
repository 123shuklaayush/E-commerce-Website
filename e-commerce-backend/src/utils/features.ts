import mongoose from "mongoose";
import { InvalidateCacheProps } from "../types/types.js";
import { myCache } from "../app.js";
import { Product } from "../models/products.js";

export const connectDB = () => {
  mongoose
    .connect("mongodb://localhost:27017", {
      dbName: "Ecommerce_24",
    })
    .then((c) => console.log(`DB Connected to ${c.connection.host}`))
    .catch((error) => console.log(error));
};

export const invalidateCache = async({
  product,
  order,
  admin,
}: InvalidateCacheProps) => {
  if (product) {
    const productKeys: string[] = [
      "latest-products",
      "categories",
      "all-products",
    ];
    myCache.del(productKeys);
    const products = await Product.find({}).select("_id")

  products.forEach(i => {
    const id = i._id
    productKeys.push(`product-${id}`)
  });
}
  if (order) {
  }
  if (admin) {
  }
};
