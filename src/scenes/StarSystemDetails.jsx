import { Canvas } from "@react-three/fiber";
import StarSystemDetails from "../pages/StarSystemDetailsPage";
import { useReducer } from "react";
import StarReducer from "../reducers/Star";
import StarContext from "../contexts/Star";

function StarSystemDetailsScene() {
    const [starInfo, setStarInfo] = useReducer(StarReducer, {})

    return (
        <StarContext.Provider value={{ starInfo, setStarInfo}}>
            <Canvas>
                <StarSystemDetails />
            </Canvas>
        </StarContext.Provider>
    )
}

export default StarSystemDetailsScene