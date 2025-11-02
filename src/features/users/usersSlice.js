import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/usersApi';

// Async thunks
export const loadUsers = createAsyncThunk('users/load', async (_, thunkAPI) => {
  try {
    const res = await api.fetchUsers();
    return res.data;
  } catch (err) {
    thunkAPI.dispatch({
      type: 'toast/addToast',
      payload: {
        type: 'error',
        message: err.response?.data?.message || 'Failed to load users'
      }
    });
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});

export const addUser = createAsyncThunk('users/add', async (payload, thunkAPI) => {
  try {
    const res = await api.createUser(payload);
    return res.data;
  } catch (err) {
    thunkAPI.dispatch({
      type: 'toast/addToast',
      payload: {
        type: 'error',
        message: err.response?.data?.message || 'Failed to create user'
      }
    });
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});

export const editUser = createAsyncThunk('users/edit', async ({ id, payload }, thunkAPI) => {
  try {
    const res = await api.updateUser(id, payload);
    return res.data;
  } catch (err) {
    thunkAPI.dispatch({
      type: 'toast/addToast',
      payload: {
        type: 'error',
        message: err.response?.data?.message || 'Failed to update user'
      }
    });
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});

export const removeUser = createAsyncThunk('users/remove', async (id, thunkAPI) => {
  try {
    await api.deleteUser(id);
    return id;
  } catch (err) {
    thunkAPI.dispatch({
      type: 'toast/addToast',
      payload: {
        type: 'error',
        message: err.response?.data?.message || 'Failed to delete user'
      }
    });
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    // optional synchronous reducers
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUsers.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(loadUsers.fulfilled, (s, a) => { s.loading = false; s.list = a.payload; })
      .addCase(loadUsers.rejected, (s, a) => { s.loading = false; s.error = a.payload; })

      .addCase(addUser.fulfilled, (s, a) => { s.list.unshift(a.payload); })
      .addCase(addUser.rejected, (s, a) => { s.error = a.payload; })

      .addCase(editUser.fulfilled, (s, a) => {
        s.list = s.list.map(u => (u.id === a.payload.id ? a.payload : u));
      })
      .addCase(editUser.rejected, (s, a) => { s.error = a.payload; })

      .addCase(removeUser.fulfilled, (s, a) => {
        s.list = s.list.filter(u => u.id !== a.payload);
      })
      .addCase(removeUser.rejected, (s, a) => { s.error = a.payload; });
  },
});

export default usersSlice.reducer;