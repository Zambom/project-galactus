import ReactDOM from 'react-dom/client'
import { StrictMode, useReducer } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import GalaxiesScene from './scenes/Galaxies.jsx'
import StarSystemsScene from './scenes/StarSystems.jsx'
import StarSystemDetailsScene from './scenes/StarSystemDetails.jsx'

import './index.css'
import StarReducer from './reducers/Star.jsx'
import StarContext from './contexts/Star.jsx'

function Router() {
  const [starInfo, setStarInfo] = useReducer(StarReducer, {})

  return (
    <StarContext.Provider value={{ starInfo, setStarInfo}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GalaxiesScene />} />
            <Route path="/star-systems" element={<StarSystemsScene />} />
            <Route path="/star-system-details" element={<StarSystemDetailsScene />} />
        </Routes>
      </BrowserRouter>
    </StarContext.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
