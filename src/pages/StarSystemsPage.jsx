import { useLayoutEffect, useMemo, useRef } from "react"
import { Perf } from "r3f-perf"
import { DoubleSide, Scene, Vector3 } from "three"
import { createPortal, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"

import Star from "../components/Stars/main"
import { generateCustomTexture } from "../utils/textures"

import texVertexShader from '../shaders/Star/texture/vertex.glsl';
import texFragmentShader from '../shaders/Star/texture/fragment.glsl';
import { generatePosition } from "../utils/positioning"
import { randomStar } from "../utils/randomizeElements"

function StarSystems() {
    const starsCount = 10

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
        />
    })

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

            {stars}
        </>
    )
}

export default StarSystems