import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/api/reminders`;

const getToken = () => localStorage.getItem('token');

// Thunks
export const fetchReminders = createAsyncThunk(
  'reminders/fetch',
  async (page = 1, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}?page=${page}&limit=5`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Fetch failed');
    }
  }
);

export const addReminder = createAsyncThunk(
  'reminders/add',
  async (reminder, { rejectWithValue }) => {
    try {
      const res = await axios.post(API_URL, reminder, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Add failed');
    }
  }
);

export const updateReminder = createAsyncThunk(
  'reminders/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, data, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Update failed');
    }
  }
);

export const deleteReminder = createAsyncThunk(
  'reminders/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Delete failed');
    }
  }
);

// Slice
const reminderSlice = createSlice({
  name: 'reminders',
  initialState: {
    items: [],
    loading: false,
    error: null,
    success: null,
    totalPages: 1,
    currentPage: 1,
  },
  reducers: {
    clearStatus: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // FETCH
      .addCase(fetchReminders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReminders.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.reminders;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchReminders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD
      .addCase(addReminder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addReminder.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
        state.success = 'Reminder added successfully';
      })
      .addCase(addReminder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateReminder.fulfilled, (state, action) => {
        const idx = state.items.findIndex((r) => r._id === action.payload._id);
        if (idx !== -1) state.items[idx] = action.payload;
        state.success = 'Reminder updated';
      })

      // DELETE
      .addCase(deleteReminder.fulfilled, (state, action) => {
        state.items = state.items.filter((r) => r._id !== action.payload);
        state.success = 'Reminder deleted';
      });
  },
});

export const { clearStatus } = reminderSlice.actions;
export default reminderSlice.reducer;
