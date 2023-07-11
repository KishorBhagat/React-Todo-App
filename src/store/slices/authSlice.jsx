import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const signup = createAsyncThunk('auth/signup', async (data) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            withCredentials: true,
            body: JSON.stringify(data),
        });
        return response.json();
    }
    catch (error) {
        return error;
    }

})

export const login = createAsyncThunk('auth/login', async (data) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            withCredentials: true,
            body: JSON.stringify(data),
        });
        return response.json();
    }
    catch (error) {
        return error;
    }
})

export const requestResetPassword = createAsyncThunk('auth/requestResetPassword', async (data) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/requestResetPassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        return response.json();
    }
    catch (error) {
        return error;
    }
})

export const verifyResetPassword = createAsyncThunk('auth/verifyResetPassword', async ({formData, resetToken}) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/verifyResetPassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'resetToken': resetToken
            },
            body: JSON.stringify(formData),
        });
        return response.json();
    }
    catch (error) {
        return error;
    }
})

export const updatePassword = createAsyncThunk('auth/updatePassword', async ({formData, resetToken}) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/updatePassword`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'resetToken': resetToken
            },
            body: JSON.stringify(formData),
        });
        return response.json();
    }
    catch (error) {
        return error;
    }
})

export const refreshLogin = createAsyncThunk('auth/refreshLogin', async (data) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/refreshToken`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            withCredentials: true,
        });
        return response.json();
    }
    catch (error) {
        return error;
    }

})


const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoading: false,
        data: null,
        isLoggedIn: false,
        isError: false,
        message: null,
    },
    reducers: {
        logout: (state) => {
            state.data = null;
            state.isLoggedIn = false;
            localStorage.removeItem('accessToken');
            window.location.replace('/');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoggedIn = true;
                state.isLoading = false;
                state.isError = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.error.message;
            })

        builder
            .addCase(signup.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = null;
            })
            .addCase(signup.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.error.message;
            })

        builder
            .addCase(requestResetPassword.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(requestResetPassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = null;
            })
            .addCase(requestResetPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.error.message;
            })

        builder
            .addCase(verifyResetPassword.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(verifyResetPassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = null;
            })
            .addCase(verifyResetPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.error.message;
            })

        builder
            .addCase(updatePassword.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(updatePassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = null;
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.error.message;
            })

        // .addCase(refreshLogin.fulfilled, (state, action) => {
        //     // state.isLoggedIn = false;
        //     // state.isLoading = false;
        //     // state.isError = null;
        // })
    }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;




/*
const expirationTimestamp = 1689960293;
const expirationDate = new Date(expirationTimestamp * 1000); // Convert seconds to milliseconds

console.log(expirationDate);
*/