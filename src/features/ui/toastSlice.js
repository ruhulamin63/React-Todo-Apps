import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  toasts: [], // Array of { id, type, message, duration }
};

let toastId = 0;

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    addToast(state, action) {
      const id = ++toastId;
      state.toasts.push({
        id,
        type: action.payload.type || 'info',
        message: action.payload.message,
        duration: action.payload.duration || 5000,
      });
    },
    removeToast(state, action) {
      state.toasts = state.toasts.filter(toast => toast.id !== action.payload);
    },
    clearToasts(state) {
      state.toasts = [];
    },
  },
});

export const { addToast, removeToast, clearToasts } = toastSlice.actions;
export default toastSlice.reducer;