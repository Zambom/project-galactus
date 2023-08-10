import { Perf } from "r3f-perf";
import { useMemo, useRef } from "react";
import { DoubleSide, Scene } from "three";
import { OrbitControls } from "@react-three/drei";
import { createPortal, useFrame } from "@react-three/fiber";
import Planet from "../components/Planets/main";
import Star from "../components/Stars/main";
import { randomPlanet, randomStar } from "../utils/randomizeElements";
import { generateCustomTexture } from "../utils/textures";

import texVertexShader from '../shaders/Star/texture/vertex.glsl';
import texFragmentShader from '../shaders/Star/texture/fragment.glsl';

function StarSystemDetails() {
    const star = useRef()
    const cameraControls = useRef()
    const planetOrbit = useRef()

    const options = randomPlanet()

    const starOptions = randomStar()

    const texMaterial = useRef()

    const texScene = useMemo(() => new Scene())

    const { texture: starTexture, update } = generateCustomTexture(texScene)

    const texUniforms = useMemo(() => ({
        uTime: { value: 0 },
    }), [])

    useFrame((state) => {
        const { camera, clock } = state

        texMaterial.current.uniforms.uTime.value = clock.elapsedTime

        update()

        planetOrbit.current.rotation.y += 0.005
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

            <OrbitControls />

            <Star
                reference={star}
                options={starOptions}
                texture={starTexture}
                position={[0, 0, -10]}
                cameraControls={cameraControls}
            />

            <group ref={planetOrbit} position={[0, 0, -10]}>
                <Planet options={options} />
            </group>
        </>
    )
}

export default StarSystemDetails