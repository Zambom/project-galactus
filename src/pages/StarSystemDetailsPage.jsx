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
import store from "../store";
import { toggleVisibility } from "../utils/html";
import { gsap } from "gsap";

function StarSystemDetails() {
    const planetsCount = 10

    const backBtn = document.getElementById("backBtn")
    const infoModal = document.getElementById("infoModal")

    const star = useRef()
    const cameraControls = useRef()

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
        return <group key={index} ref={orbitsReferences[index]} rotation-y={Math.random() * Math.PI} position={[0, 0, -10]}>
            <Planet reference={planetsReferences[index]} options={config.options} cameraControls={cameraControls} />
        </group>
    })

    useFrame((state) => {
        const { camera, clock } = state

        texMaterial.current.uniforms.uTime.value = clock.elapsedTime

        update()

        if (!store.individualView) {
            orbitsReferences.forEach((el, index) => {
                el.current.rotation.y += planetsConfig[index].translationSpeed
            })
        }

        if (store.accessEventFired) {
            planetsReferences.forEach(el => {
                if (el.current.uuid !== store.accessedUuid) {
                    el.current.visible = false
                }
            })

            if (star.current.uuid !== store.accessedUuid) {
                star.current.visible = false
            }

            store.accessEventFired = false
        }

        if (store.resetPositionEventFired) {
            planetsReferences.forEach(el => {
                el.current.visible = true
            })

            star.current.visible = true

            toggleVisibility(infoModal)

            gsap.to(camera.position,  {
                x: 0,
                y: 35,
                z: 100,
                onComplete: () => {
                    cameraControls.current.enabled = true
                    cameraControls.current.reset()

                    toggleVisibility(backBtn)
                }
            })

            store.resetPositionEventFired = false
        }
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