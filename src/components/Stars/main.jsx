import { PerspectiveCamera, RenderTexture, useCubeCamera, useFBO } from "@react-three/drei"
import { useMemo, useRef } from "react"
import { DoubleSide, LinearMipMapLinearFilter, RGBAFormat, Scene, Vector3, WebGLCubeRenderTarget, sRGBEncoding, CubeCamera } from "three";
import { createPortal, useFrame, useThree } from "@react-three/fiber";

import texVertexShader from '../../shaders/Star/texture/vertex.glsl';
import texFragmentShader from '../../shaders/Star/texture/fragment.glsl';
import starVertexShader from '../../shaders/Star/main/vertex.glsl';
import starFragmentShader from '../../shaders/Star/main/fragment.glsl';

export default function Star() {
    const mesh = useRef()
    const texMaterial = useRef()

    
    const texRenderTarget = new WebGLCubeRenderTarget(256, {
        format: RGBAFormat,
        generateMipmaps: true,
        minFilter: LinearMipMapLinearFilter,
        encoding: sRGBEncoding
    })

    const cubeCamera = useMemo(() => new CubeCamera(0.1, 10, texRenderTarget))
    
    const texScene = new Scene()

    const texUniforms = useMemo(() => ({
        uTime: { value: 0 },
    }), [])

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uTexture: { value: null },
        uColorFactors: { value: new Vector3(2.0, 2.0, 1.0) }
    }), [])

    useFrame((state) => {
        const { gl, clock } = state

        texMaterial.current.uniforms.uTime.value = clock.elapsedTime

        mesh.current.material.uniforms.uTexture.value = texRenderTarget.texture

        mesh.current.material.uniforms.uTime.value = clock.elapsedTime

        cubeCamera.update(gl, texScene)
    }, [])

    return (
        <>
            {createPortal(
                <>
                    <mesh>
                        <sphereGeometry args={[4.9, 50, 50]} />
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
            <mesh ref={mesh} position-z={-10}>
                <sphereGeometry args={[5, 50, 50]} />
                <shaderMaterial 
                    uniforms={uniforms}
                    vertexShader={starVertexShader}
                    fragmentShader={starFragmentShader}
                />
            </mesh>
        </>
    )
}