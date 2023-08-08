import { Canvas } from "@react-three/fiber"
import StarSystems from "../pages/StarSystemsPage"
import { useReducer } from "react"
import StarContext from "../contexts/Star"
import StarReducer from "../reducers/Star"
import HtmlCanvas from "../components/Stars/HtmlCanvas"

function StarSystemsScene() {
    const [starInfo, setStarInfo] = useReducer(StarReducer, {title: '', content: ''})

    return (
        <StarContext.Provider value={{ starInfo, setStarInfo}}>
            <HtmlCanvas />
            <Canvas>
                <StarSystems />
            </Canvas>
        </StarContext.Provider>
    )
}

export default StarSystemsScene