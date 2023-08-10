import { Canvas } from "@react-three/fiber"
import StarSystems from "../pages/StarSystemsPage"
import HtmlCanvas from "../components/Stars/HtmlCanvas"

function StarSystemsScene() {
    return (
        <>
            <HtmlCanvas />
            <Canvas>
                <StarSystems />
            </Canvas>
        </>
    )
}

export default StarSystemsScene