import { OrbitControls } from '@react-three/drei'
import './App.css'
import Galaxy from './components/Galaxy'
import { Vector3 } from 'three'

function App() {

  return (
    <>
      <OrbitControls />

      <Galaxy />
    </>
  )
}

export default App
