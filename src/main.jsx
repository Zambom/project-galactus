import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Canvas } from '@react-three/fiber'
import { StrictMode } from 'react'
import HtmlCanvas from './components/HtmlCanvas.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HtmlCanvas />
    <Canvas>
      <App />
    </Canvas>
  </StrictMode>,
)
