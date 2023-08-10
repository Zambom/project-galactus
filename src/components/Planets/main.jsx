import { useFrame } from "@react-three/fiber"
import { DoubleSide, Vector3 } from "three"
import { useMemo, useRef } from "react"

import vertexRockyShader from "../../shaders/Planet/rocky/vertex.glsl"
import fragmentRockyShader from "../../shaders/Planet/rocky/fragment.glsl"

import vertexGassyShader from "../../shaders/Planet/gassy/vertex.glsl"
import fragmentGassyShader from "../../shaders/Planet/gassy/fragment.glsl"

import vertexRingShader from "../../shaders/Planet/rings/vertex.glsl"
import fragmentRingShader from "../../shaders/Planet/rings/fragment.glsl"

export default function Planet({ options }) {
    const mesh = useRef()
    const rings = useRef()

    const defaults = {
        type: 0,
        hasRings: 0,
        scale: 1.0,
        inclination: 0.0,
        rotation: 0.0005,
        rockyType: 0,
        gassyStrips: 0.25,
        ringsScale: 20,
        ringsBaseOpacity: 1.0,
        waterColor: new Vector3(0.0, 0.2, 0.4),
        landColor: new Vector3(0.2, 0.4, 0.3),
        peakColor: new Vector3(0.42, 0.4, 0.42),
        contrast: new Vector3(0.8, 0.5, 0.4),
        brightness: new Vector3(0.2, 0.4, 0.2),
        oscilation: new Vector3(2.0, 1.0, 1.0),
        phase: new Vector3(0.0, 0.25, 0.25),
        ringInnerColor: new Vector3(0.66, 0.38, 0.6),
        ringOuterColor: new Vector3(0.33, 0.22, 0.47),
        information: {
            title: 'Planeta A',
            content: ''
        }
    }

    const parameters = { ...defaults, ...options }

    let vertexShader = null
    let fragmentShader = null

    if (parameters.type == 0) {
        vertexShader = vertexRockyShader
        fragmentShader = fragmentRockyShader
    } else {
        vertexShader = vertexGassyShader
        fragmentShader = fragmentGassyShader
    }

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uType: { value: parameters.rockyType },
        uStrips: { value: parameters.gassyStrips },
        uWaterColor: { value: parameters.waterColor },
        uLandColor: { value: parameters.landColor },
        uPeakColor: { value: parameters.peakColor },
        uContrast: { value: parameters.contrast },
        uBrightness: { value: parameters.brightness },
        uOscilation: { value: parameters.oscilation },
        uPhase: { value: parameters.phase },
    }), [])

    const rUniforms = useMemo(() => ({
        uOpacity: { value: parameters.ringsBaseOpacity },
        uInnerColor: { value: parameters.ringInnerColor },
        uOuterColor: { value: parameters.ringOuterColor },
    }), [])

    useFrame((state) => {
        const { clock } = state

        mesh.current.material.uniforms.uTime.value = clock.getElapsedTime()

        mesh.current.rotation.y += parameters.rotation
    })

    return (
        <group position={[0, 0, -5]} rotation={[0.01, 0.2, parameters.inclination]} scale={parameters.scale}>
            <mesh ref={mesh} visible={true}>
                <sphereGeometry args={[5, 32, 32]} />
                <shaderMaterial 
                    uniforms={uniforms}
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    transparent
                />
            </mesh>
            <mesh ref={rings} rotation-x={Math.PI * 0.5} scale={parameters.ringsScale} visible={parameters.hasRings == 1}>
                <planeGeometry />
                <shaderMaterial
                    uniforms={rUniforms}
                    vertexShader={vertexRingShader}
                    fragmentShader={fragmentRingShader}
                    side={DoubleSide}
                    transparent={true}
                />
            </mesh>
        </group>
    )
}