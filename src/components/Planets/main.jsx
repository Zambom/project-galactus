import { useFrame } from "@react-three/fiber"
import { useLayoutEffect, useMemo, useRef } from "react"

import vertexShader from "../../shaders/Planet/rocky/vertex.glsl"
import fragmentShader from "../../shaders/Planet/rocky/fragment.glsl"
import { Vector3 } from "three"

export default function Planet() {
    const mesh = useRef()

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uType: { value: 4 },
        uWaterColor: { value: new Vector3(0.0, 0.2, 0.4) },
        uLandColor: { value: new Vector3(0.2, 0.4, 0.3) },
        uPeakColor: { value: new Vector3(0.42, 0.4, 0.42) },
    }), [])

    useLayoutEffect(() => {
        //mesh.current.rotation.z += 5
    }, [])

    useFrame((state) => {
        const { clock } = state

        mesh.current.material.uniforms.uTime.value = clock.getElapsedTime()

        mesh.current.rotation.y += 0.0005
    })

    return (
        <>
            <mesh ref={mesh} position={[0, 0, -5]}>
                <sphereGeometry args={[5, 32, 32]} />
                <shaderMaterial 
                    uniforms={uniforms}
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    transparent
                />
            </mesh>
        </>
    )
}