import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/reminders';

const getToken = () => localStorage.getItem('token');

export const fetchReminders = createAsyncThunk('reminders/fetch', async () => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.data;
});

export const addReminder = createAsyncThunk('reminders/add', async (reminder) => {
  const res = await axios.post(API_URL, reminder, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.data;
});

export const updateReminder = createAsyncThunk('reminders/update', async ({ id, data }) => {
  const res = await axios.put(`${API_URL}/${id}`, data, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.data;
});

export const deleteReminder = createAsyncThunk('reminders/delete', async (id) => {
  await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return id;
});

const reminderSlice = createSlice({
  name: 'reminders',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReminders.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addReminder.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateReminder.fulfilled, (state, action) => {
        const index = state.items.findIndex((r) => r._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteReminder.fulfilled, (state, action) => {
        state.items = state.items.filter((r) => r._id !== action.payload);
      });
  },
});

export default reminderSlice.reducer;
