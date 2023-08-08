import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import GalaxiesScene from './scenes/Galaxies.jsx'
import StarSystemsScene from './scenes/StarSystems.jsx'
import StarSystemDetailsScene from './scenes/StarSystemDetails.jsx'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GalaxiesScene />} />
        <Route path="/star-systems" element={<StarSystemsScene />} />
        <Route path="/star-system-details" element={<StarSystemDetailsScene />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
