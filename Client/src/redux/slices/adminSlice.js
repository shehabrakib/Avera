import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


//async thunk to fetch all users (admin only)
export const fetchUsers = createAsyncThunk(
    "admin/fetchUsers",
    async () => {
       
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
            }
        )
        return response.data;
       
    }
)

//Add user async thunk (admin only)
export const addUser = createAsyncThunk(
    "admin/addUser",
    async (userData, {rejectWithValue}) => {  
       try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
                userData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    },
                }
            )
            return response.data;
       } catch (error) {
            console.error(error)
            return rejectWithValue(error.response.data)
       }
        
    }
)

//update user async thunk (admin only)
export const updateUser = createAsyncThunk(
    "admin/updateUser",
    async ({id, name, email, role}) => {
        const response = await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
            {name, email, role},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,   
                },
            }
        )
        return response.data
    }
)

//Delete user async thunk (admin only)
export const deleteUser = createAsyncThunk(
    "admin/deleteUser", 
    async (id) => {
        await axios.delete(
            `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,   
                },
            }
        )
        return id
    }
)

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false
                state.users = action.payload
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || "Failed to fetch users"
            })
            .addCase(addUser.pending, (state) => {
                state.loading = true
                state.error = null
            }) 
            .addCase(addUser.fulfilled, (state, action) => {
                state.loading = false
                state.users.push(action.payload)
            })
            .addCase(addUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message || "Failed to add user"
            })
            .addCase(updateUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false
                const updatedUser = action.payload
                const userIndex = state.users.findIndex(user => user._id === updatedUser._id)
                if (userIndex !== -1) {
                    state.users[userIndex] = updatedUser
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || "Failed to update user"
            })
            .addCase(deleteUser.pending, (state) => {
                state.loading = true   
                state.error = null
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false
                state.users = state.users.filter(user => user._id !== action.payload)
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || "Failed to delete user"
            })

    },
})

export default adminSlice.reducer;