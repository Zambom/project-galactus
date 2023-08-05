import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Canvas } from '@react-three/fiber'
import { StrictMode, useReducer } from 'react'
import HtmlCanvas from './components/HtmlCanvas.jsx'
import GalaxyContext from './contexts/Galaxy.jsx'
import GalaxyReducer from './reducers/Galaxy.jsx'

function Experience() {
  const [galaxyInfo, setGalaxyInfo] = useReducer(GalaxyReducer, { title: '', content: '' })

  return (
    <GalaxyContext.Provider value={{ galaxyInfo, setGalaxyInfo }}>
      <HtmlCanvas />
      <Canvas>
        <App />
      </Canvas>
    </GalaxyContext.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Experience />
  </StrictMode>,
)
