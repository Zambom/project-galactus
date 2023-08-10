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
    const planetsCount = 10

    const star = useRef()
    const cameraControls = useRef()
    const planetOrbit = useRef()

    const planetsReferences = []
    const orbitsReferences = []

    for (let i = 0; i < planetsCount; i++) {
        planetsReferences.push(useRef())
        orbitsReferences.push(useRef())
    }

    const planetsConfig = useMemo(() => {
        const configs = []
        const orbits = [-1.5]

        for (let i = 0; i < planetsCount; i++) {
            const options = randomPlanet(5, orbits)

            orbits.push(options.orbit)

            const translationSpeed = (Math.random() + 0.5) / (options.orbit * 1.1)

            configs.push({ options, translationSpeed })
        }

        return configs
    }, [])

    const starOptions = randomStar()

    const texMaterial = useRef()

    const texScene = useMemo(() => new Scene())

    const { texture: starTexture, update } = generateCustomTexture(texScene)

    const texUniforms = useMemo(() => ({
        uTime: { value: 0 },
    }), [])

    const planets = planetsConfig.map((config, index) => {
        return <group key={index} ref={orbitsReferences[index]} position={[0, 0, -10]}>
            <Planet options={config.options} />
        </group>
    })

    useFrame((state) => {
        const { camera, clock } = state

        texMaterial.current.uniforms.uTime.value = clock.elapsedTime

        update()

        orbitsReferences.forEach((el, index) => {
            el.current.rotation.y += planetsConfig[index].translationSpeed
        })
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

            {planets}
        </>
    )
}

export default StarSystemDetails