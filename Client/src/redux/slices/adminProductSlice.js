import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/admin/products`
const USER_TOKEN = `Bearer ${localStorage.getItem("userToken")}`

//async thunk too fetch products (admin only)
export const fetchAdminProducts = createAsyncThunk(
    "adminProducts/fetchAdminProducts",
    async()=>{
        const response = await axios.get(
            `${API_URL}/api/admin/products`,
            {
                headers: {
                    Authorization: USER_TOKEN,
                },  
            }
        )
        return response.data;
    }
)

//asynnc function to create product (admin only)
export const createProduct = createAsyncThunk(
    "adminProducts/createProduct",
    async(productData) => {
        const response = await axios.post(
            `${API_URL}/api/admin/products`,
            productData,
            {   
                headers: {
                    Authorization: USER_TOKEN,
                },
            }
        )
        return response.data;
    }
)
//async thunk to update a product (admin only)
export const updateProduct = createAsyncThunk(
    "adminProducts/updateProduct",
    async({Id, productData}) => {
        const response = await axios.put(
            `${API_URL}/api/admin/products/${Id}`,
            productData,
            {
                headers: {
                    Authorization: USER_TOKEN,
                },
            }
        )
        return response.data;
    }  
)

//async thunk to delete a product (admin only)
export const deleteProduct = createAsyncThunk(
    "adminProducts/deleteAProduct",
    async(Id) => {
        await axios.delete(
            `${API_URL}/api/admin/products/${Id}`,
            {
                headers: {
                    Authorization: USER_TOKEN,  
                },
            }
        )
        return Id;
    }
)

const adminProductSlice = createSlice({
    name: "adminProducts",
    initialState: {
        products: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminProducts.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchAdminProducts.fulfilled, (state, action) => {
                state.loading = false
                state.products = action.payload
            })
            .addCase(fetchAdminProducts.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || "Failed to fetch products"
            })
            .addCase(createProduct.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false
                state.products.push(action.payload)
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false   
                state.error = action.error.message || "Failed to create product"
            })
            .addCase(updateProduct.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false
                const updatedProduct = action.payload   
                const productIndex = state.products.findIndex(
                    (product) => product._id === updatedProduct._id
                )   
                if (productIndex !== -1) {
                    state.products[productIndex] = updatedProduct
                }
            })  
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || "Failed to update product"
            })
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false
                state.products = state.products.filter(
                    (product) => product._id !== action.payload
                )
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || "Failed to delete product"
            })
    },
})

export default adminProductSlice.reducer;