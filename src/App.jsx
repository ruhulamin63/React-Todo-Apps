import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import AppRouter from './router/AppRouter.jsx'
import MainLayout from './layouts/MainLayout.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import ToastContainer from './components/common/ToastContainer.jsx'
import GlobalModal from './components/common/GlobalModal.jsx'

function App() {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <Router>
          <MainLayout>
            <AppRouter />
          </MainLayout>
        </Router>
        
        <ToastContainer />
        <GlobalModal />
      </Provider>
    </ThemeProvider>
  )
}

export default App