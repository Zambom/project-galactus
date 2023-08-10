import { Canvas } from "@react-three/fiber";
import StarSystemDetails from "../pages/StarSystemDetailsPage";
import HtmlCanvas from "../components/Planets/HtmlCanvas";

function StarSystemDetailsScene() {
    return (
        <>
            <HtmlCanvas />
            <Canvas
                camera={{
                    position: [0, 35, 100]
                }}
            >
                <StarSystemDetails />
            </Canvas>
        </>
    )
}

export default StarSystemDetailsScene