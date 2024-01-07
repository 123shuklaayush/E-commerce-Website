import mongoose from 'mongoose';

const schema = new mongoose.Schema(
    {
        shippingInfo: {
            address: {
                type: String,
                required: [true, "Please Enter Address"],
            },
            city: {
                type: String,
                required: [true, "Please Enter City"],
            },
            state: {
                type: String,
                required: [true, "Please Enter Phone Number"],
            },
            country: {
                type: String,
                required: [true, "Please Enter Country"],
            },
            pinCode: {
                type: Number,
                required: [true, "Please Enter Postal Code"],
            },
        },
        user:{
            type: String,
            ref: "User",
            required: true,
        },
        subtotal: {
            type: Number,
            required: true,
        },
        tax: {
            type: Number,
            required: true,
        },
        shippingCharges: {
            type: Number,
            required: true,
        },
        discount: {
            type: Number,
            required: true,
        },
        total: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["Processing", "Shipped", "Delivered"],
            default: "Processing",
        },
        orderItems: [
            {
            name: String,
            photo: String,
            price: Number,
            quantity: Number,
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
        }
    ]

    },{
        timestamps: true,
    }
)

export const Order = mongoose.model("Order", schema);
