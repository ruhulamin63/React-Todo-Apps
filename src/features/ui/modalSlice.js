import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
  mode: null, // 'create' | 'edit' | 'confirmDelete'
  props: null, // arbitrary props e.g. { user }
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal(state, action) {
      state.open = true;
      state.mode = action.payload.mode;
      state.props = action.payload.props || null;
    },
    closeModal(state) {
      state.open = false;
      state.mode = null;
      state.props = null;
    },
  },
});

export const { showModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;