import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './todoSlice'
import usersReducer from '../features/users/usersSlice';
import modalReducer from '../features/ui/modalSlice';


export const store = configureStore({
  reducer: {
    todos: todoReducer,
    users: usersReducer,
    modal: modalReducer
  }
})