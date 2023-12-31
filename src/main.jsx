import ReactDOM from 'react-dom/client'
import { StrictMode, useReducer } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
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

import { loader as GalaxyLoader } from './controllers/Galaxy.jsx'
import { loader as StarLoader } from './controllers/StarSystem.jsx'
import { loader as PlanetLoader } from './controllers/Planet.jsx'

function Router() {
  const [galaxyInfo, setGalaxyInfo] = useReducer(GalaxyReducer, {})
  const [starInfo, setStarInfo] = useReducer(StarReducer, {})
  const [planetInfo, setPlanetInfo] = useReducer(PlanetReducer, {})

  const router = createBrowserRouter([
    {
      path: "/",
      element: <GalaxiesScene />,
      loader: GalaxyLoader
    },
    {
      path: "star-systems/:galaxy_id",
      element: <StarSystemsScene />,
      loader: async ({params}) => StarLoader(params.galaxy_id)
    },
    {
      path: "star-system-details/:star_id",
      element: <StarSystemDetailsScene />,
      loader: async ({params}) => PlanetLoader(params.star_id)
    }
  ])

  return (
    <GalaxyContext.Provider value={{ galaxyInfo, setGalaxyInfo }}>
      <StarContext.Provider value={{ starInfo, setStarInfo}}>
        <PlanetContext.Provider value={{ planetInfo, setPlanetInfo }}>
          <RouterProvider router={router} />
        </PlanetContext.Provider>
      </StarContext.Provider>
    </GalaxyContext.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router />
)
