import { Canvas } from "@react-three/fiber";
import StarSystemDetails from "../pages/StarSystemDetailsPage";
import { useReducer } from "react";
import StarReducer from "../reducers/Star";
import StarContext from "../contexts/Star";
import PlanetReducer from "../reducers/Planet";
import PlanetContext from "../contexts/Planet";
import HtmlCanvas from "../components/Planets/HtmlCanvas";

function StarSystemDetailsScene() {
    const [starInfo, setStarInfo] = useReducer(StarReducer, {})
    const [planetInfo, setPlanetInfo] = useReducer(PlanetReducer, {})

    return (
        <StarContext.Provider value={{ starInfo, setStarInfo}}>
            <PlanetContext.Provider value={{ planetInfo, setPlanetInfo }}>
                <HtmlCanvas />
                <Canvas>
                    <StarSystemDetails />
                </Canvas>
            </PlanetContext.Provider>
        </StarContext.Provider>
    )
}

export default StarSystemDetailsScene