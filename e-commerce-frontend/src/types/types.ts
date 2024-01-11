export type User = {
    name: string;
    email: string;
    photo: string;
    gender: string;
    role: string;
    dob: string,
    _id: string
}

export type Product = {
    name: string;
    price: number;
    stock: number;
    category: string;
    photo: string;
    _id: string;
}

export type ShippingInfo = {
    address: string;
    city: string;
    state: string
    country: string;
    pinCode: string;
}

export type CartItem = {
    productId: string;
    photo: string;
    name: string;
    price: number;
    quantity: number;
    stock: number;
}