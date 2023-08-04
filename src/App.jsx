import { OrbitControls } from '@react-three/drei'
import './App.css'
import Galaxy from './components/Galaxy'
import { useMemo } from 'react'
import { generatePosition, generateRotation } from './utils/positioning'
import { randomGalaxy } from './utils/randomizeElements'

function App() {
  const galaxiesCount = 7

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
      options={config.options}
      position={[config.position.x, config.position.y, config.position.z]} 
      rotation={[config.rotation.x, config.rotation.y, config.rotation.z]}
    />
  })

  return (
    <>
      <OrbitControls />

      {galaxies}
    </>
  )
}

export default App
