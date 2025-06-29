import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'

import './index.css'
import App from './App.jsx'
import Login from './pages/Login/Login.jsx'
import Register from './pages/Register/Register.jsx'
import Home from './pages/Home/Home.jsx'
import Setting from './pages/Setting/Setting.jsx'
import { StrictMode } from 'react'
import Recipes from './pages/Recipes/Recipes.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                {/* <Route path="/" element={<Login />} /> */}
                <Route path="/" element={<App />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Home />} />
                <Route path="/recipes" element={<Recipes />} />
                <Route path="/settings" element={<Setting/>} />

            </Routes>
        </BrowserRouter>
    </StrictMode>

)
