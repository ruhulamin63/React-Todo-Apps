import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './stores/store.js'
import AppRouter from './router/AppRouter.jsx'
import MainLayout from './layouts/MainLayout.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'

function App() {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <Router>
          <MainLayout>
            <AppRouter />
          </MainLayout>
        </Router>
      </Provider>
    </ThemeProvider>
  )
}

export default App