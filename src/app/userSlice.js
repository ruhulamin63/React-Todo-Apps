import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    addUser: (state, action) => {
      state.push({
        id: Date.now(),
        ...action.payload
      })
    },

    updateUser: (state, action) => {
      const { id, ...updates } = action.payload
      const userIndex = state.findIndex(user => user.id === id)
      if (userIndex !== -1) {
        state[userIndex] = { ...state[userIndex], ...updates }
      }
    },

    deleteUser: (state, action) => {
      return state.filter(user => user.id !== action.payload)
    }
  }
})

export const { addUser, updateUser, deleteUser } = userSlice.actions
export default userSlice.reducer