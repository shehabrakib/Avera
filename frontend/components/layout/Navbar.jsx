import { Link } from "react-router-dom"
import React, { useState } from "react"
import {
    HiOutlineUser, HiOutlineShoppingBag, HiBars3BottomRight
} from "react-icons/hi2"
import SearchBar from "../common/SearchBar"
import CartDrawer from "./CartDrawer"
import { IoMdClose } from "react-icons/io"

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [navDraweropen, setNavDrawerOpen] = useState(false)

    const toggleNavDrawerOpen = () => {
        setNavDrawerOpen(!navDraweropen)
    }

    const toggleCartDrawer = () => {
        setDrawerOpen(!drawerOpen)
    }
    return (
        <>
            <nav className="container mx-auto flex items-center justify-between py-4 px-6">
                <div>
                    <Link to="/" className="text-2xl font-medium">
                        Shoply
                    </Link>
                </div>
                <div className="hidden md:flex space-x-6">
                    <Link to="#" className="text-gray-700 hover:text-black text-sm font-medium uppercase">
                        Men
                    </Link>
                    <Link to="#" className="text-gray-700 hover:text-black text-sm font-medium uppercase">
                        Women
                    </Link>
                    <Link to="#" className="text-gray-700 hover:text-black text-sm font-medium uppercase">
                        Top Wear
                    </Link>
                    <Link to="#" className="text-gray-700 hover:text-black text-sm font-medium uppercase">
                        Bottom Wear
                    </Link>
                </div>
                <div className="flex items-center space-x-4">
                    <Link to="/profile" className="hover:text-black">
                        <HiOutlineUser className="h-6 w-6 text-gray-700" />
                    </Link>
                    <button onClick={toggleCartDrawer} className="relative hover:text-black">
                        <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
                        <span className="absolute -top-1 bg-[#ea2e0e] text-white text-xs rounded-full px-2 py-0.5">
                            4
                        </span>
                    </button>
                    <div className="overflow-hidden">
                        <SearchBar />
                    </div>

                    <button className="md:hidden" onClick={toggleNavDrawerOpen}>
                        <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
                    </button>
                </div>
            </nav>
            <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />
            {/* mobile navigation */}
            <div className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white
                shadow-lg transform transition-transform duration-300 z-50 ${navDraweropen ? "translate-x-0" : "-translate-x-full"
                }`}>
                <div className="flex justify-end p-4">
                    <button onClick={toggleNavDrawerOpen}>
                        <IoMdClose className="h-6 w-6 text-gray-600" />
                    </button>
                </div>
                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-4">Menu</h2>
                    <nav className="space-y-4">
                        <Link to="#" onClick={toggleNavDrawerOpen} className="block text-gray-600 hover:text-black">
                            Men
                        </Link>
                        <Link to="#" onClick={toggleNavDrawerOpen} className="block text-gray-600 hover:text-black">
                            Women
                        </Link>
                        <Link to="#" onClick={toggleNavDrawerOpen} className="block text-gray-600 hover:text-black">
                            Top wear
                        </Link>
                        <Link to="#" onClick={toggleNavDrawerOpen} className="block text-gray-600 hover:text-black">
                            Bottom Wear
                        </Link>
                    </nav>
                </div>

            </div>

        </>
    )
}

export default Navbar
