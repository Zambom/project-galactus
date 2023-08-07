import { useLayoutEffect, useMemo, useRef } from "react"
import { Vector3, AdditiveBlending, BackSide } from "three";
import { useFrame } from "@react-three/fiber";

import starVertexShader from '../../shaders/Star/main/vertex.glsl';
import starFragmentShader from '../../shaders/Star/main/fragment.glsl';
import atmosphereVertexShader from '../../shaders/Star/atmosphere/vertex.glsl';
import atmosphereFragmentShader from '../../shaders/Star/atmosphere/fragment.glsl';

export default function Star({options, reference, texture, position = [0, 0, 0]}) {
    const globe = useRef()
    const atmosphere = useRef()

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
    }, [])

    return (
        <>
            <group ref={reference} position={position}>
                <mesh ref={globe}>
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