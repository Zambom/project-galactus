import { useFrame, useThree } from "@react-three/fiber"
import { DoubleSide, Vector3 } from "three"
import { useContext, useMemo, useRef } from "react"

import vertexRockyShader from "../../shaders/Planet/rocky/vertex.glsl"
import fragmentRockyShader from "../../shaders/Planet/rocky/fragment.glsl"

import vertexGassyShader from "../../shaders/Planet/gassy/vertex.glsl"
import fragmentGassyShader from "../../shaders/Planet/gassy/fragment.glsl"

import vertexRingShader from "../../shaders/Planet/rings/vertex.glsl"
import fragmentRingShader from "../../shaders/Planet/rings/fragment.glsl"
import PlanetContext from "../../contexts/Planet"
import store from "../../store"
import { gsap } from "gsap"
import { toggleVisibility } from "../../utils/html"
import { Text } from "@react-three/drei"

export default function Planet({ reference, options, cameraControls }) {
    const { setPlanetInfo } = useContext(PlanetContext)
    
    const globe = useRef()
    const rings = useRef()
    const title = useRef()

    const { camera } = useThree()

    const backBtn = document.getElementById("backBtn")
    const infoModal = document.getElementById("infoModal")

    const defaults = {
        type: 0,
        orbit: 10,
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
            content: '',
            article: '',
            page: ''
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

        globe.current.material.uniforms.uTime.value = clock.getElapsedTime()

        globe.current.rotation.y += parameters.rotation

        if (store.resetPositionEventFired) {
            title.current.visible = true
        }
    })

    const clickEvent = (event) => {
        event.stopPropagation()
        
        if (globe.current && cameraControls.current.enabled) {
            setPlanetInfo({
                title: parameters.information.title,
                content: parameters.information.content,
                article: parameters.information.article,
                page: parameters.information.page
            })

            store.accessEventFired = true
            store.individualView = true
            store.accessedUuid = reference.current.uuid

            title.current.visible = false

            setTimeout(() => {
                const position = new Vector3()
                globe.current.getWorldPosition(position)
    
                cameraControls.current.enabled = false

                gsap.to(camera.position, {
                    x: position.x,
                    y: position.y,
                    z: position.z + 12.0,
                    onComplete: () => {
                        camera.lookAt(position)
                        camera.updateProjectionMatrix()
    
                        toggleVisibility(backBtn)
                        toggleVisibility(infoModal)
                    }
                })
            }, 500)
        }
    }

    return (
        <group ref={reference} position={[parameters.orbit, 0, -5]}>
            <Text ref={title} position-y={8} scale={2.5}>{parameters.information.title}</Text>
            <group rotation={[0.01, 0.2, parameters.inclination]} scale={parameters.scale}>
                <mesh ref={globe} onClick={clickEvent}>
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
        </group>
    )
}