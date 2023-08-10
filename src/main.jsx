import ReactDOM from 'react-dom/client'
import { StrictMode, useReducer } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import GalaxiesScene from './scenes/Galaxies.jsx'
import StarSystemsScene from './scenes/StarSystems.jsx'
import StarSystemDetailsScene from './scenes/StarSystemDetails.jsx'

import './index.css'

import GalaxyContext from './contexts/Galaxy.jsx'
import GalaxyReducer from './reducers/Galaxy.jsx'

import StarContext from './contexts/Star.jsx'
import StarReducer from './reducers/Star.jsx'

import PlanetContext from './contexts/Planet.jsx'
import PlanetReducer from './reducers/Planet.jsx'

function Router() {
  const [galaxyInfo, setGalaxyInfo] = useReducer(GalaxyReducer, {})
  const [starInfo, setStarInfo] = useReducer(StarReducer, {})
  const [planetInfo, setPlanetInfo] = useReducer(PlanetReducer, {})

  return (
    <GalaxyContext.Provider value={{ galaxyInfo, setGalaxyInfo }}>
      <StarContext.Provider value={{ starInfo, setStarInfo}}>
        <PlanetContext.Provider value={{ planetInfo, setPlanetInfo }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<GalaxiesScene />} />
                <Route path="/star-systems" element={<StarSystemsScene />} />
                <Route path="/star-system-details" element={<StarSystemDetailsScene />} />
            </Routes>
          </BrowserRouter>
        </PlanetContext.Provider>
      </StarContext.Provider>
    </GalaxyContext.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
