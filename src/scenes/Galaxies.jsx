import { useReducer } from "react"
import GalaxyReducer from "../reducers/Galaxy"
import GalaxyContext from "../contexts/Galaxy"
import Galaxies from '../pages/GalaxiesPage.jsx'
import HtmlCanvas from "../components/HtmlCanvas"
import { Canvas } from "@react-three/fiber"

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