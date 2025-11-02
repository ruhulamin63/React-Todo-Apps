import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import { useTheme } from '../hooks/useTheme'

const MainLayout = ({ children }) => {
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout