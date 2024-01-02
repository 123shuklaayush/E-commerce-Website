import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CardItem from "../components/cart-item";
import { Link } from "react-router-dom";
const cartItems= [
  {
    productId: "adfasdfas",
    photo: "https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/81Svdy-MGbL._AC_SX466_.jpg",
    name: "MacBook",
    price: 3000,
    quantity: 4,
    stock: 10
  }
];
const subtotal = 4000;
const tax = Math.round(subtotal * 0.18);
const shippingCharge = 430;
const total = subtotal + tax + shippingCharge;
const discount  = 300;

const Cart = () => {

  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);  

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if(Math.random() > 0.5) 
      setIsValidCouponCode(true);

      else setIsValidCouponCode(false);
    }, 1000);

    return () => {
      clearTimeout(timeOutId);
    }
  }, [couponCode])

  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? cartItems.map((i, idx) => (
          <CardItem key={idx} cartItem={i}/>
        )):
        <h1>No Items Added</h1>
        }
      </main>
      <aside>
        <p>Subtotal: ₹{subtotal}</p>
        <p>Shipping Charge: ₹{shippingCharge}</p>
        <p>Tax: ₹{tax}</p>
        <p>  
          Discount:<em className="red"> - ₹{discount}</em>
        </p>
        <p>
          <b>Total: ₹{total}</b>
        </p>
        <input type="text" value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
        placeholder="Coupon Code"/>
        {couponCode && (
          isValidCouponCode ? (
            <span className="green">
              ₹{discount} off using the <code>{couponCode}</code>
            </span>) :(
            <span className="red">
              Invalid Coupon Code <VscError/> 
            </span>)
        )}
        {
          cartItems.length > 0 && <Link to = "/shipping">Checkout</Link>
        }
      </aside>
    </div>
  )
}

export default Cart
