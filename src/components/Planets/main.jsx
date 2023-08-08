import { useFrame } from "@react-three/fiber"
import { DoubleSide, Vector3 } from "three"
import { useLayoutEffect, useMemo, useRef } from "react"

import vertexShader from "../../shaders/Planet/gassy/vertex.glsl"
import fragmentShader from "../../shaders/Planet/gassy/fragment.glsl"

import vertexRingShader from "../../shaders/Planet/rings/vertex.glsl"
import fragmentRingShader from "../../shaders/Planet/rings/fragment.glsl"

export default function Planet() {
    const mesh = useRef()
    const rings = useRef()

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
        <group position={[0, 0, -5]} rotation={[0, 0.2, 0.5]}>
            <mesh ref={mesh} visible={true}>
                <sphereGeometry args={[5, 32, 32]} />
                <shaderMaterial 
                    uniforms={uniforms}
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    transparent
                />
            </mesh>
            <mesh ref={rings} rotation-x={Math.PI * 0.5} scale={20}>
                <planeGeometry />
                <shaderMaterial
                    uniforms={uniforms}
                    vertexShader={vertexRingShader}
                    fragmentShader={fragmentRingShader}
                    side={DoubleSide}
                    transparent={true}
                />
            </mesh>
        </group>
    )
}