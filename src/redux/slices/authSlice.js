import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('token');
const role = localStorage.getItem('role');
const name = localStorage.getItem('name');

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: token || '',
    role: role || '',
    name: name || '',
    isAuthenticated: !!token,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.name = action.payload.name;
      state.isAuthenticated = true;

      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('role', action.payload.role);
      localStorage.setItem('name', action.payload.name);
    },
    logout: (state) => {
      state.token = '';
      state.role = '';
      state.name = '';
      state.isAuthenticated = false;

      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('name');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
