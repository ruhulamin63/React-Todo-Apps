import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Todos from '../pages/Todos'
import Users from '../features/users/UsersPage.jsx'

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/todos" element={<Todos />} />
      <Route path="/users" element={<Users />} />
    </Routes>
  )
}

export default AppRouter