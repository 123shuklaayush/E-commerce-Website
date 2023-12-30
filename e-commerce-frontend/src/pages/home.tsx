import { Link } from "react-router-dom"
import ProductCard from "../components/product-card"

const Home = () => {
  const addToCartHandler = () => {

  }
  return (
    <div className="home">
      <section></section>
        <h1>
          Latest Products
          <Link to = "/search" className="findmore">
            More
          </Link>
        </h1>
        <main>
          <ProductCard productId="asda" name="Macbook" price={100} stock={100} handler={addToCartHandler} photo="https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/81Svdy-MGbL._AC_SX466_.jpg" />
        </main>
    </div>
  )
}

export default Home
