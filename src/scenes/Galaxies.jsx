import { useReducer } from "react"
import { Canvas } from "@react-three/fiber"

import GalaxyReducer from "../reducers/Galaxy"
import GalaxyContext from "../contexts/Galaxy"

import HtmlCanvas from "../components/Galaxies/HtmlCanvas"
import Galaxies from '../pages/GalaxiesPage.jsx'

function GalaxiesScene() {
    const [galaxyInfo, setGalaxyInfo] = useReducer(GalaxyReducer, { title: '', content: '' })

    return (
        <GalaxyContext.Provider value={{ galaxyInfo, setGalaxyInfo }}>
            <HtmlCanvas />
            <Canvas>
                <Galaxies />
            </Canvas>
        </GalaxyContext.Provider>
    )
}

export default GalaxiesScene