import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContextValue.jsx'

export const useTheme = () => useContext(ThemeContext)