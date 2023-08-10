import { Canvas } from "@react-three/fiber"
import HtmlCanvas from "../components/Galaxies/HtmlCanvas"
import Galaxies from '../pages/GalaxiesPage.jsx'

function GalaxiesScene() {
    return (
        <>
            <HtmlCanvas />
            <Canvas>
                <Galaxies />
            </Canvas>
        </>
    )
}

export default GalaxiesScene