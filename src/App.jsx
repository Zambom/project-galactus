import { OrbitControls, CameraControls } from '@react-three/drei'
import './App.css'
import Galaxy from './components/Galaxy'
import { useMemo, useRef } from 'react'
import { generatePosition, generateRotation } from './utils/positioning'
import { randomGalaxy } from './utils/randomizeElements'
import { Perf } from 'r3f-perf'
import { MathUtils, Object3D } from 'three'
import { useFrame } from '@react-three/fiber'
import store from './store'

function App() {
  const galaxiesCount = 7

  const cameraControls = useRef()

  const galaxiesConfig = useMemo(() => {
    const configs = []

    const positions = []

    for (let i = 0; i < galaxiesCount; i++) {
      const pos = generatePosition(positions)
      positions.push(pos)

      const rotation = generateRotation()

      const options = randomGalaxy()

      configs.push({ options, position: pos, rotation })
    }

    return configs
  }, [])

  const galaxies = galaxiesConfig.map((config, index) => {
    return <Galaxy 
      key={index} 
      cameraControls={cameraControls}
      options={config.options}
      position={[config.position.x, config.position.y, config.position.z]} 
      rotation={[config.rotation.x, config.rotation.y, config.rotation.z]}
      //position={[0, 0, -20]}
      //rotation={[5.0762894106919285, 5.962762456976361, 5.542767988970172]}
    />
  })

  useFrame(({ camera }) => {
    if (store.animationStarted) {
      camera.position.x = MathUtils.damp(camera.position.x, store.targetObj.position.x, 4, 0.1)
      camera.position.y = MathUtils.damp(camera.position.y, store.targetObj.position.y, 4, 0.1)
      camera.position.z = MathUtils.damp(camera.position.z, store.targetObj.position.z, 4, 0.1)
      
      console.log(camera.rotation, store.targetObj.rotation)
      camera.rotation.set(store.targetObj.rotation.x, store.targetObj.rotation.y, store.targetObj.rotation.z)

      if (camera.position.distanceTo(store.targetObj.position) < 0.5) {
        store.animationStarted = false
      }
      //camera.lookAt(store.targetObj.position)
    }
  })

  return (
    <>
      <Perf position="top-left" />

      {/*<CameraControls ref={cameraControls} />*/}
      <OrbitControls ref={cameraControls} />

      {galaxies}
    </>
  )
}

export default App
