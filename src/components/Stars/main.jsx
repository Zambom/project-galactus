import { useContext, useLayoutEffect, useMemo, useRef } from "react"
import { Vector3, AdditiveBlending, BackSide } from "three";
import { useFrame, useThree } from "@react-three/fiber";

import starVertexShader from '../../shaders/Star/main/vertex.glsl';
import starFragmentShader from '../../shaders/Star/main/fragment.glsl';
import atmosphereVertexShader from '../../shaders/Star/atmosphere/vertex.glsl';
import atmosphereFragmentShader from '../../shaders/Star/atmosphere/fragment.glsl';
import { Text } from "@react-three/drei";
import StarContext from "../../contexts/Star";
import store from "../../store";
import { gsap } from "gsap";
import { toggleVisibility } from "../../utils/html";

export default function Star({options, reference, texture, position = [0, 0, 0], cameraControls}) {
    const { setStarInfo } = useContext(StarContext)
    
    const globe = useRef()
    const atmosphere = useRef()
    const title = useRef()

    const { camera } = useThree()

    const backBtn = document.getElementById("backBtn")
    const infoModal = document.getElementById("infoModal")

    const defaults = {
        colorFactors: new Vector3(1.0, 2.0, 4.0),
        information: {
            title: 'Estrela A',
            content: '',
        }
    }
    const parameters = { ...defaults, ...options }

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uTexture: { value: null },
        uColorFactors: { value: parameters.colorFactors }
    }), [])

    useLayoutEffect(() => {
        atmosphere.current.scale.set(1.1, 1.1, 1.1)
    }, [])

    useFrame((state) => {
        const { clock } = state

        globe.current.material.uniforms.uTexture.value = texture

        globe.current.material.uniforms.uTime.value = clock.elapsedTime

        if (store.resetPositionEventFired) {
            title.current.visible = true
        }
    }, [])

    const clickEvent = (event) => {
        event.stopPropagation()

        if (globe.current && cameraControls.current.enabled) {
            setStarInfo({
                title: parameters.information.title,
                content: parameters.information.content
            })

            store.accessEventFired = true
            store.accessedUuid = reference.current.uuid

            title.current.visible = false

            const position = new Vector3()
            globe.current.getWorldPosition(position)

            cameraControls.current.enabled = false

            gsap.to(camera.position, {
                x: position.x,
                y: position.y,
                z: position.z + 15.0,
                onComplete: () => {
                    camera.lookAt(position)
                    camera.updateProjectionMatrix()

                    toggleVisibility(backBtn)
                    toggleVisibility(infoModal)
                }
            })
        }
    }

    return (
        <>
            <group ref={reference} position={position}>
                <Text ref={title} position={[0, 7, 0]} scale={2.5}>{parameters.information.title}</Text>
                <mesh ref={globe} onClick={clickEvent}>
                    <sphereGeometry args={[5, 32, 32]} />
                    <shaderMaterial 
                        uniforms={uniforms}
                        vertexShader={starVertexShader}
                        fragmentShader={starFragmentShader}
                    />
                </mesh>
                <mesh ref={atmosphere}>
                    <sphereGeometry args={[5, 32, 32]} />
                    <shaderMaterial
                        transparent
                        uniforms={uniforms}
                        vertexShader={atmosphereVertexShader}
                        fragmentShader={atmosphereFragmentShader}
                        blending={AdditiveBlending}
                        side={BackSide}
                    />
                </mesh> 
            </group>
        </>
    )
}