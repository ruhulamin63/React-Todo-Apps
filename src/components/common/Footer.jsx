import { useTheme } from '../../hooks/useTheme'

const Footer = () => {
  const { theme } = useTheme()

  return (
    <footer className={`p-4 mt-8 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-900'}`}>
      <div className="container mx-auto text-center">
        <p>&copy; 2025 My React App. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer