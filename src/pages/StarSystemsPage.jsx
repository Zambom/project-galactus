import { useLayoutEffect, useMemo, useRef } from "react"
import { Perf } from "r3f-perf"
import { DoubleSide, Scene } from "three"
import { createPortal, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"

import Star from "../components/Stars/main"
import { generateCustomTexture } from "../utils/textures"

import texVertexShader from '../shaders/Star/texture/vertex.glsl';
import texFragmentShader from '../shaders/Star/texture/fragment.glsl';

function StarSystems() {
    const cameraControls = useRef()
    const texMaterial = useRef()

    const texScene = useMemo(() => new Scene())

    const { texture: starTexture, update } = generateCustomTexture(texScene)

    const texUniforms = useMemo(() => ({
        uTime: { value: 0 },
    }), [])

    useFrame((state) => {
        const { clock } = state

        texMaterial.current.uniforms.uTime.value = clock.elapsedTime

        update()
    }, [])

    return (
        <>
            {createPortal(
                <>
                    <mesh>
                        <sphereGeometry args={[4.9, 32, 32]} />
                        <shaderMaterial 
                            ref={texMaterial}
                            uniforms={texUniforms}
                            vertexShader={texVertexShader}
                            fragmentShader={texFragmentShader}
                            side={DoubleSide}
                        />
                    </mesh>
                </>,
                texScene
            )}

            <Perf position="top-left" />

            <OrbitControls ref={cameraControls} />

            <Star texture={starTexture} position={[10, 0, -20]} />
            <Star texture={starTexture} position={[-10, 0, -20]} />
        </>
    )
}

export default StarSystems