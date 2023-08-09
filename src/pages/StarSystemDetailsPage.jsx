import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import Planet from "../components/Planets/main";

function StarSystemDetails() {
    return (
        <>
            <Perf position="top-left" />

            <OrbitControls />

            <Planet options={{ type: 0, hasRings: 1 }} />
        </>
    )
}

export default StarSystemDetails