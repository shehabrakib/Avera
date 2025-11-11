import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

//fetch all orders (admin only)
export const fetchAllOrders = createAsyncThunk(
    "adminOrders/fetchAllOrders",
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    },
                }
            )
            return response.data
        } catch (error) {
            console.error(error)
            return rejectWithValue(error.response.data)
        }
    }
)

//update order status (admin only)

export const updateOrderStatus = createAsyncThunk(
    "adminOrders/updateOrderStatus",
    async ({id, status}, {rejectWithValue}) => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,
                {status},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    },
                }
            )
            console.log(response.data)
            return response.data
        } catch (error) {
            console.error(error)
            return rejectWithValue(error.response.data)
        }
    }
)
//Delete and order (admin only)
export const deleteOrder = createAsyncThunk(
    "adminOrders/deleteOrder",
    async (id, {rejectWithValue}) => {
        try {
            await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    },
                }
            )
            return id
        } catch (error) {
            console.error(error)
            return rejectWithValue(error.response.data)
        }
    }
)

const adminOrderSlice = createSlice({
    name: "adminOrders",
    initialState: {
        orders: [],
        totalOrders:0,
        totalSales:0,
        loading: false,
        error: null,
    },  
    reducers: {},
    extraReducers: (builder) => {
        builder
            //fetch all orders
            .addCase(fetchAllOrders.pending, (state) => {
                state.loading = true    
                state.error = null
            }   )
            .addCase(fetchAllOrders.fulfilled, (state, action) => {
                state.loading = false
                state.orders = action.payload
                state.totalOrders = action.payload.length
                const totalSales = action.payload.reduce((total, order) => total + order.totalPrice, 0);
                state.totalSales = totalSales
            })
            .addCase(fetchAllOrders.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message || "Could not fetch orders"
            })  
            //update order status
            .addCase(updateOrderStatus.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                state.loading = false
                const index = state.orders.findIndex(order => order._id === action.payload.order._id) 
                if (index !== -1) {
                    state.orders[index] = action.payload.order
                }
            })
            .addCase(updateOrderStatus.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message || "Could not update order status"
            })
            //delete order
            .addCase(deleteOrder.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.loading = false
                state.orders = state.orders.filter(order => order._id !== action.payload)   
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message || "Could not delete order"
            })
    }
})

export default adminOrderSlice.reducer

