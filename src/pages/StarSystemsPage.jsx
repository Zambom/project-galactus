import { useRef } from "react"
import { Perf } from "r3f-perf"
import { OrbitControls } from "@react-three/drei"

import Star from "../components/Stars/main"

function StarSystems() {
    const cameraControls = useRef()

    return (
        <>
            <Perf position="top-left" />

            <OrbitControls ref={cameraControls} />

            <Star />
        </>
    )
}

export default StarSystems