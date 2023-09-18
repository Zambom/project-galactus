import { Perf } from "r3f-perf";
import { useContext, useEffect, useMemo, useRef } from "react";
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
import StarContext from "../contexts/Star";
import { useLoaderData } from "react-router-dom";
import { updateParameters } from "../controllers/Planet";

function StarSystemDetails() {
    const planetsData = useLoaderData()

    const planetsCount = planetsData.length || 0

    const { starInfo } = useContext(StarContext)

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

    const starOptions = useMemo(() => {
        const options = starInfo ?? randomStar()
        options.scale = Math.max(1.5, Math.random() * 5.0)

        if (!options.information) {
            options.information = {
                title: options.title,
                content: options.content
            }
        }

        return options
    }, [])

    const { configs: planetsConfig, updateData } = useMemo(() => {
        const configs = []

        const updateData = []

        const orbits = [5 * starOptions.scale]

        for (let i = 0; i < planetsCount; i++) {
            const planetData = planetsData[i]

            let options, translationSpeed

            if (planetData.parameters && planetData.parameters !== "") {
                const params = JSON.parse(planetData.parameters)

                options = params.options

                translationSpeed = params.translationSpeed
            } else {
                options = randomPlanet(6, orbits)

                translationSpeed = (Math.random() + 0.5) / (options.orbit * 20)

                updateData.push({
                    id: planetData.id,
                    name: planetData.name,
                    description: planetData.description,
                    star_id: planetData.star_id,
                    parameters: JSON.stringify({ options, translationSpeed })
                })
            }

            orbits.push(options.orbit)

            options.information.title = planetData.name
            options.information.content = planetData.description
            options.information.article = planetData.article
            options.information.page = planetData.page

            configs.push({ options, translationSpeed })
        }

        return { configs, updateData }
    }, [])

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

    useEffect(() => {
        const updateParams = async () => {
            if (updateData && updateData.length > 0) {
                await updateParameters(updateData)
            }
        }

        updateParams()
    }, [updateData])

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
            
            {/*<Perf position="top-left" />*/}

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