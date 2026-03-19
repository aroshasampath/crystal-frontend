import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import AdminPage from './pages/adminPage'
import HomePage from './pages/homePage'
import Loginpage from './pages/loginPage'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <BrowserRouter>
      <div className="w-full h-[100vh]">
        <Toaster position='top-right'/>
        <Routes>
          <Route path="/*" element={<HomePage/>} />
          <Route path="/register" element={<h1>register page</h1>} />
          <Route path="/login" element={<Loginpage/>} />
          <Route path="/admin/*" element={<AdminPage />} />
         
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App