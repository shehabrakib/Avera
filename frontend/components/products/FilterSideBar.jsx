import { useSearchParams } from "react-router-dom"
import { useState, useEffect } from "react"

const FilterSideBar = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filters, setFilters]= useState({
    category :"",
    gender:"",
    color:"",
    size:[],
    material:[],
    brand:[],
    minPrice:0,
    maxPrice:100,
  })
  const [priceRange, setPriceRange] = useState([0,100])
  const categories = ["Top Wear", "Bottom Wear"]
  const colors = ["Red","Blue","Black","Navy","Yellow"]
  const sizes = ["S","L","XL","XXL"]
  const materials = ["Cotton","Wool","Denim","Silk"]
  const brands = ["Urban Threads","Xaraa","Fashionly","ChicStyle"]
  const genders = ["Women","Men"]

  useEffect(() => {
    const params = Object.fromEntries([...searchParams])

    setFilters({
      category:params.category || "",
      gender: params.gender || "",
      color:params.color || "",
      size: params.size ? params.size.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice :params.minPrice || 0,
      maxPrice: params.maxPrice || 0,
    })
    setPriceRange([0,params.maxPrice || 100])

  },[searchParams])
  return (
    <div className="p-4">
      <h3 className="text-xl font-medium text-gray-800 mb-4">Filter</h3>
      {/* category  */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Category</label>
        {categories.map((category)=>(
          <div
          key={category} 
          className="flex items-center">
            <input
            type="radio"
            name="category"
            className="mr-2 h-4 w-4 text-blue-500 focus:rinf-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{category}</span>
          </div>
        ))}
      </div>

      {/* gender */}

      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Gender</label>
        {genders.map((gender)=>(
          <div
          key={gender} 
          className="flex items-center">
            <input
            type="radio"
            name="gender"
            className="mr-2 h-4 w-4 text-blue-500 focus:rinf-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{gender}</span>
          </div>
        ))}
      </div>

      {/* color */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Color</label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color)=>(
            <button
            key={color}
            name="color"
            className="w-8 h-8 rounded-full border border-gray-300 cursor-pointer transition
            hover:scale-105"
            style={{backgroundColor: color.toLowerCase()}}
            >      
            </button>
          ))}
        </div>
      </div>
      {/* size */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Size</label>
        {sizes.map((size) => (
          <div key={size} className="flex items-center mb-1">
            <input
            type="checkbox"
            name="size"
            className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{size}</span>
          </div>
        ))}
      </div>

      {/* material */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Material</label>
        {materials.map((material) => (
          <div key={material} className="flex items-center mb-1">
            <input
            type="checkbox"
            name="material"
            className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{material}</span>
          </div>
        ))}
      </div>

      {/* brand */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Size</label>
        {brands.map((brand) => (
          <div key={brand} className="flex items-center mb-1">
            <input
            type="checkbox"
            name="brand"
            className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{brand}</span>
          </div>
        ))}
      </div>
        {/* pricerange */}
      <div className="mb-8">
        <label className="block text-gray-600 font-medium mb-2">
          Price Range
        </label>
      </div>
      <input
      type="range"
      name="priceRange"
      min={0}
      max={100}
      className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
      />
      <div className="flex justify-between text-gray-600 mt-2">
        <span>$0</span>
        <span>${priceRange[1]}</span>
      </div>
    </div>
  )
}

export default FilterSideBar
