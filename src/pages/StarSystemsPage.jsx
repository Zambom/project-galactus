import { useMemo, useRef } from "react"
import { Perf } from "r3f-perf"
import { DoubleSide, Scene } from "three"
import { createPortal, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"

import Star from "../components/Stars/main"
import { generateCustomTexture } from "../utils/textures"

import texVertexShader from '../shaders/Star/texture/vertex.glsl';
import texFragmentShader from '../shaders/Star/texture/fragment.glsl';
import { generatePosition } from "../utils/positioning"
import { randomStar } from "../utils/randomizeElements"
import store from "../store"
import { toggleVisibility } from "../utils/html"
import { gsap } from "gsap"

function StarSystems() {
    const starsCount = 10

    const backBtn = document.getElementById("backBtn")
    const infoModal = document.getElementById("infoModal")

    const starReferences = []

    for (let i = 0; i < starsCount; i++) {
        starReferences.push(useRef())
    }

    const starsConfig = useMemo(() => {
        const configs = []

        const positions = []

        for (let i = 0; i < starsCount; i++) {
            const pos = generatePosition(positions, 7, { x: 400, y: 100, z: 100, z_tweak: 2 })
            positions.push(pos)

            const options = randomStar()

            configs.push({ options, position: pos })
        }

        return configs
    }, [])

    const cameraControls = useRef()
    const texMaterial = useRef()

    const texScene = useMemo(() => new Scene())

    const { texture: starTexture, update } = generateCustomTexture(texScene)

    const texUniforms = useMemo(() => ({
        uTime: { value: 0 },
    }), [])

    const stars = starsConfig.map((config, index) => {
        return <Star
            reference={starReferences[index]}
            key={index}
            options={config.options}
            texture={starTexture}
            position={[config.position.x,config.position.y,config.position.z]}
            cameraControls={cameraControls}
        />
    })

    useFrame((state) => {
        const { camera, clock } = state

        texMaterial.current.uniforms.uTime.value = clock.elapsedTime

        update()

        if (store.accessEventFired) {
            starReferences.forEach(el => {
                if (el.current.uuid !== store.accessedUuid) {
                    el.current.visible = false
                }
            })

            store.accessEventFired = false
        }

        if (store.resetPositionEventFired) {
            starReferences.forEach(el => {
                el.current.visible = true
            })

            toggleVisibility(infoModal)

            gsap.to(camera.position, {
                x: 0,
                y: 0,
                z: 0,
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

            {/*<Perf position="top-left" />*/}

            <OrbitControls ref={cameraControls} />

            {stars}
        </>
    )
}

export default StarSystems