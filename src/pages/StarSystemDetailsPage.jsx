import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import Planet from "../components/Planets/main";
import { randomPlanet } from "../utils/randomizeElements";

function StarSystemDetails() {
    const options = randomPlanet()

    return (
        <>
            <Perf position="top-left" />

            <OrbitControls />

            <Planet options={options} />
        </>
    )
}

export default StarSystemDetails