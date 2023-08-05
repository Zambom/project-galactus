import { useMemo, useRef } from "react"
import { AdditiveBlending, Color, MathUtils, Object3D, Vector3 } from "three"
import vertexShader from "../shaders/Galaxy/vertex.glsl"
import fragmentShader from "../shaders/Galaxy/fragment.glsl"
import { useFrame, useThree } from "@react-three/fiber"
import { gsap } from "gsap"
import { toggleVisibility } from "../utils/html"

export default function Galaxy({ options, position = [0, 0, 0], rotation = [0, 0, 0], cameraControls }) {
    const { gl } = useThree()

    const galaxy = useRef()
    const material = useRef()
    const cameraPosition = useRef()

    const customCameraPosition = new Object3D()

    const defaults = {
        count: 200000,
        size: 0.005,
        radius: 5,
        branches: 3,
        spin: 1,
        randomness: 0.4,
        randomnessPower: 3,
        speed: 0.2,
        direction: 1,
        insideColor: 0xff6030,
        outsideColor: 0x1b3984
    }

    const parameters = { ...defaults, ...options }

    const insideColor = new Color(parameters.insideColor)
    const outsideColor = new Color(parameters.outsideColor)

    const { positions, colors, scales, randomness } = useMemo(() => {
        const positions = new Float32Array(parameters.count * 3)
        const colors = new Float32Array(parameters.count * 3)
        const scales = new Float32Array(parameters.count)
        const randomness = new Float32Array(parameters.count * 3)

        for (let i = 0; i < parameters.count; i++) {
            const i3 = i * 3
            const radius = Math.random() * parameters.radius
            const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2

            const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius
            const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius
            const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius

            randomness[i3    ] = randomX
            randomness[i3 + 1] = randomY * 0.3
            randomness[i3 + 2] = randomZ
            
            positions[i3    ] = Math.cos(branchAngle) * radius
            positions[i3 + 1] = 0
            positions[i3 + 2] = Math.sin(branchAngle) * radius

            const mixedColor = insideColor.clone()
            mixedColor.lerp(outsideColor, radius / parameters.radius)

            colors[i3    ] = mixedColor.r
            colors[i3 + 1] = mixedColor.g
            colors[i3 + 2] = mixedColor.b

            scales[i] = Math.random()
        }

        return { positions, colors, scales, randomness }
    }, [])

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uSpeed: { value: parameters.speed },
        uDirection: { value: parameters.direction },
        uSize: { value: 30 * gl.getPixelRatio() }
    }), [])

    useFrame((state) => {
        material.current.uniforms.uTime.value = 50 + state.clock.elapsedTime
    }, [])

    const { camera } = useThree()

    const clickEvent = (event) => {
        event.stopPropagation()
        if (galaxy.current && cameraControls.current) {
            const backBtn = document.getElementById("backBtn")

            cameraControls.current.enabled = false
            
            const position = new Vector3()
            cameraPosition.current.getWorldPosition(position)

            gsap.to(camera.position, { 
                x: position.x, 
                y: position.y, 
                z: position.z,
                onComplete: () => {
                    console.log(camera.position)
                    toggleVisibility(backBtn)
                }
            })
            gsap.to(camera.rotation, {
                x: rotation[0],
                y: rotation[1],
                z: rotation[2],
                onComplete: () => {
                    camera.updateProjectionMatrix()
                }
            })
        }
    }

    return <group>
        <mesh 
            ref={galaxy}
            position={position} 
            rotation={rotation}
            onClick={clickEvent}
            visible={false}
        >
            <boxGeometry args={[15, 2, 15]} />
            <meshBasicMaterial />
        </mesh>
        <group position={position} rotation={rotation}>
            <primitive ref={cameraPosition} object={customCameraPosition} position={[0, 2, 8]} />
            <points>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={parameters.count}
                        itemSize={3}
                        array={positions}
                    />
                    
                    <bufferAttribute
                        attach="attributes-color"
                        count={parameters.count}
                        itemSize={3}
                        array={colors}
                    />
                    
                    <bufferAttribute
                        attach="attributes-aScale"
                        count={parameters.count}
                        itemSize={1}
                        array={scales}
                    />
                    
                    <bufferAttribute
                        attach="attributes-aRandomness"
                        count={parameters.count}
                        itemSize={3}
                        array={randomness}
                    />
                </bufferGeometry>
                <shaderMaterial
                    ref={material}
                    fragmentShader={fragmentShader}
                    vertexShader={vertexShader}
                    depthWrite={false}
                    vertexColors={true}
                    blending={AdditiveBlending}
                    uniforms={uniforms}
                    transparent
                />
            </points>
        </group>
    </group>
}