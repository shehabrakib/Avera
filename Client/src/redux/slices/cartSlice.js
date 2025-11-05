import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios"

//helper function to load cart from local storage
const loadCartFromStorage = () => {
    const storedCart = localStorage.getItem("cart")
    return storedCart ? JSON.parse(storedCart) : {products:[]}
}

//helper function to save cart to local storage
const saveCartToStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart))
}

//fetc cart for a user or guest
export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async({userId, guestId}, {rejectWithValue}) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
                {params: {userId, guestId}}
            )
            return response.data
        } catch (error) {
            console.error(error)
            return rejectWithValue(error.response.data)
        }       
    }
)

//add an item to the cart for a user or guest
export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async({userId, guestId, productId, quantity, size, color}, {rejectWithValue}) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/cart/`,{
                    userId,
                    guestId,
                    productId, 
                    quantity,
                    size,
                    color
                }
            )
            return response.data
        }
        catch (error) {
            console.error(error)
            return rejectWithValue(error.response.data)
        }   
    }
)
//update cart item quantity 
export const updateCartItem = createAsyncThunk(
    "cart/updateCartItemQuantity",
    async({userId, guestId, productId, quantity, size, color}, {rejectWithValue}) => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/cart/`,{
                    userId,
                    guestId,
                    productId, 
                    quantity,
                    size,
                    color,
                }
            )
            return response.data
        } catch (error) {
            console.error(error)
            return rejectWithValue(error.response.data)
        }   
    }
)
            
//remove item from cart
export const removeFromCart = createAsyncThunk(
    "cart/removeFromCart",
    async({userId, guestId, productId, size, color}, {rejectWithValue}) => {    
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/api/cart/`,{
                    data: {
                        userId,
                        guestId,
                        productId, 
                        size,
                        color,
                    }
                }
            )
            return response.data
        } catch (error) {
            console.error(error)
            return rejectWithValue(error.response.data)
        }       
    }
)

//merge guest cart into user cart upon login/registration
export const mergeCart = createAsyncThunk(
    "cart/mergeCart",
    async({user, guestId}, {rejectWithValue}) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`,{
                    user,guestId
                },{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    }
                }
            )
            return response.data
        } catch (error) {
            console.error(error)
            return rejectWithValue(error.response.data)
        }
    }
)
