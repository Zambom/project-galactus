import { useThree } from "@react-three/fiber";
import { useCallback, useMemo } from "react";
import { CubeCamera, LinearMipMapLinearFilter, RGBAFormat, WebGLCubeRenderTarget, sRGBEncoding } from "three";

export function generateCustomTexture(scene) {
    const { gl } = useThree()

    const renderTarget = new WebGLCubeRenderTarget(256, {
        format: RGBAFormat,
        generateMipmaps: true,
        minFilter: LinearMipMapLinearFilter,
        encoding: sRGBEncoding
    })

    const cubeCamera = useMemo(() => new CubeCamera(0.1, 10, renderTarget))

    const update = useCallback(() => {
        cubeCamera.update(gl, scene)
    }, [gl, scene, cubeCamera])

    return { texture: renderTarget.texture, update }
}