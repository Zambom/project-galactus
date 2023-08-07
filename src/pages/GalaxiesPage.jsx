import { OrbitControls } from '@react-three/drei'
import Galaxy from '../components/Galaxy'
import { useMemo, useRef } from 'react'
import { generatePosition, generateRotation } from '../utils/positioning'
import { randomGalaxy } from '../utils/randomizeElements'
import { Perf } from 'r3f-perf'
import { useFrame } from '@react-three/fiber'

import store from '../store'
import { gsap } from 'gsap'
import { toggleVisibility } from '../utils/html'

function Galaxies() {
  const galaxiesCount = 7

  const cameraControls = useRef()

  const galaxyReferences = []

  for (let i = 0; i < galaxiesCount; i++) {
    galaxyReferences.push(useRef())
  }

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
      reference={galaxyReferences[index]}
      key={index} 
      cameraControls={cameraControls}
      options={config.options}
      position={[config.position.x, config.position.y, config.position.z]} 
      rotation={[config.rotation.x, config.rotation.y, config.rotation.z]}
    />
  })
  
  const backBtn = document.getElementById("backBtn")
  const infoModal = document.getElementById("infoModal")

  useFrame((state) => {
    if (store.accessEventFired) {
      galaxyReferences.forEach(el => {
        //el.current.visible = false
        if (el.current.uuid !== store.accessedUuid) {
          el.current.visible = false
        }
      })
      
      store.accessEventFired = false
    }

    if (store.resetPositionEventFired) {
      const { camera } = state

      galaxyReferences.forEach(el => {
        el.current.visible = true
      })

      toggleVisibility(infoModal)

      gsap.to(camera.position, {
        x: 0,
        y: 0,
        z: 0,
        onComplete: () => {
          cameraControls.current.enabled = true
          cameraControls.current.reset()
        }
      })
      gsap.to(camera.rotation, {
        x: 0,
        y: 0,
        z: 0,
        onComplete: () => {
          camera.updateProjectionMatrix()
          
          toggleVisibility(backBtn)
        }
      })

      store.resetPositionEventFired = false
    }
  }, [])

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls ref={cameraControls} />

      {galaxies}
    </>
  )
}

export default Galaxies
