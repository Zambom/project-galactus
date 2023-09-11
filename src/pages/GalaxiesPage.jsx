import { OrbitControls } from '@react-three/drei'
import Galaxy from '../components/Galaxies/main'
import { useEffect, useMemo, useRef } from 'react'
import { generatePosition, generateRotation } from '../utils/positioning'
import { randomGalaxy } from '../utils/randomizeElements'
import { Perf } from 'r3f-perf'
import { useFrame } from '@react-three/fiber'
import { useLoaderData } from 'react-router-dom'

import store from '../store'
import { gsap } from 'gsap'
import { toggleVisibility } from '../utils/html'
import { updateParameters } from '../controllers/Galaxy'

function Galaxies() {
  const galaxiesData = useLoaderData()

  const galaxiesCount = galaxiesData.length || 0

  const cameraControls = useRef()

  const galaxyReferences = []

  for (let i = 0; i < galaxiesCount; i++) {
    galaxyReferences.push(useRef())
  }

  const { configs: galaxiesConfig, updateData } = useMemo(() => {
    const configs = []

    const updateData = []

    const positions = []

    for (let i = 0; i < galaxiesCount; i++) {
      const galaxyData = galaxiesData[i]

      let pos, rotation, options

      if (galaxyData.parameters && galaxyData.parameters !== "") {
        const params = JSON.parse(galaxyData.parameters)

        pos = params.position

        rotation = params.rotation

        options = params.options
      } else {
        pos = generatePosition(positions, 5, {x: 80, y: 30, z: 10, z_tweak: 2})
  
        rotation = generateRotation()
  
        options = randomGalaxy()

        updateData.push({ 
          id: galaxyData.id, 
          name: galaxyData.name,
          description: galaxyData.description,
          parameters: JSON.stringify({ options, position: pos, rotation }) 
        })
      }
      
      positions.push(pos)

      options.information.id = galaxyData.id
      options.information.title = galaxyData.name
      options.information.content = galaxyData.description

      configs.push({ options, position: pos, rotation })
    }

    return { configs, updateData }
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

  useEffect(() => {
    const update = async () => {
      if (updateData && updateData.length > 0) {
        await updateParameters(updateData)
      }
    }

    update()
  }, [updateData])

  useFrame((state) => {
    if (store.accessEventFired) {
      galaxyReferences.forEach(el => {
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
      {/*<Perf position="top-left" />*/}

      <OrbitControls ref={cameraControls} />

      {galaxies}
    </>
  )
}

export default Galaxies
