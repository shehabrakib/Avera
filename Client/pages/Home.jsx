import {useEffect, useState } from "react"
import Hero from "../components/layout/Hero"
import FeaturedCollection from "../components/products/FeaturedCollection"
import FeaturedSection from "../components/products/FeaturedSection"
import GenderCollectionSection from "../components/products/GenderCollectionSection"
import NewArrivals from "../components/products/NewArrivals"
import ProductDetails from "../components/products/ProductDetails"
import ProductGrid from "../components/products/ProductGrid"
import {useDispatch, useSelector} from "react-redux"
import { fetchProductsByFilters } from "../src/redux/slices/productsSlice"
import axios from "axios"

// const placeholderProducts = [
//   {
//     _id: 1,
//     name: "Product 1",
//     price: 100,
//     images: [{ url: "https://picsum.photos/500/500?random=1" }],

//   },
//   {
//     _id: 2,
//     name: "Product 2",
//     price: 100,
//     images: [{ url: "https://picsum.photos/500/500?random=2" }],

//   },
//   {
//     _id: 3,
//     name: "Product 3",
//     price: 100,
//     images: [{ url: "https://picsum.photos/500/500?random=3" }],

//   },
//   {
//     _id: 4,
//     name: "Product 4",
//     price: 100,
//     images: [{ url: "https://picsum.photos/500/500?random=4" }],

//   },
//   {
//     _id: 5,
//     name: "Product 5",
//     price: 100,
//     images: [{ url: "https://picsum.photos/500/500?random=5" }],

//   },
//   {
//     _id: 6,
//     name: "Product 6",
//     price: 100,
//     images: [{ url: "https://picsum.photos/500/500?random=6" }],

//   },
//   {
//     _id: 7,
//     name: "Product 7",
//     price: 100,
//     images: [{ url: "https://picsum.photos/500/500?random=7" }],

//   },
//   {
//     _id: 8,
//     name: "Product 8",
//     price: 100,
//     images: [{ url: "https://picsum.photos/500/500?random=8" }],

//   },
// ]
const Home = () => {
  const dispatch = useDispatch()
  const {products, loading, error} = useSelector((state) => state.products)
  const [bestSellerProduct,setBestSellerProduct] = useState(null)

  useEffect(()=>{
    //fetch products for a specific collection
    dispatch(fetchProductsByFilters({
      gender: "Men",
      category: "Bottom Wear",
      limit: 8,
    }))

    //fetch best seller product
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        )
        setBestSellerProduct(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchBestSeller()

  },[dispatch])

  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />
      <h2 className="text-3xl text-center font-bold mb-4">
        Best Seller
      </h2>
      {bestSellerProduct ? (<ProductDetails productId={bestSellerProduct._id}/>):(
        <p className="text-center">Loading best seller product...</p>
      )}



      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top Wears for Women
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
      <FeaturedCollection />
      <FeaturedSection />
    </div>
  )
}

export default Home
