import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Canvas } from '@react-three/fiber'
import { StrictMode } from 'react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Canvas>
      <App />
    </Canvas>
  </StrictMode>,
)