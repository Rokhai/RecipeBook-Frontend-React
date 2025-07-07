import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'

import './index.css'
import App from './App.jsx'
import Login from './pages/Login/Login.tsx'
import Register from './pages/Register/Register.tsx'
import Home from './pages/Home/Home.tsx'
import Setting from './pages/Setting/Setting.tsx'
import { StrictMode } from 'react'
import Recipes from './pages/Recipes/Recipes.tsx'
import Create from './pages/Recipes/Create'
import Edit from './pages/Recipes/Edit'

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
                <Route path="/recipes/create" element={<Create />} />
                <Route path="/recipes/edit/:id" element={<Edit />} />
                <Route path="/settings" element={<Setting/>} />
            </Routes>
        </BrowserRouter>
    </StrictMode>

)
