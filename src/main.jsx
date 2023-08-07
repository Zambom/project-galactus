import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import GalaxiesScene from './scenes/Galaxies.jsx'
import StarSystemsScene from './scenes/StarSystems.jsx'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GalaxiesScene />} />
        <Route path="/star-systems" element={<StarSystemsScene />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
