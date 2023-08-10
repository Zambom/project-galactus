import { Canvas } from "@react-three/fiber"
import StarSystems from "../pages/StarSystemsPage"
import { useReducer } from "react"
import StarContext from "../contexts/Star"
import StarReducer from "../reducers/Star"
import HtmlCanvas from "../components/Stars/HtmlCanvas"

function StarSystemsScene() {
    const [starInfo, setStarInfo] = useReducer(StarReducer, {})

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