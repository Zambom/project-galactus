import { Vector3 } from "three"

export const distToCenter = (center, point) => {
    return Math.pow(point.x - center.x, 2) + Math.pow(point.y - center.y, 2) + Math.pow(point.z - center.z, 2)
}

export const testPosition = (positions, pos, dist) => {
    if (positions.length > 0) {
        const minDist = Math.pow(dist, 3)

        for (let i = 0; i < positions.length; i++) {
            const toCenter = distToCenter(positions[i], pos)

            if (toCenter < minDist) {
                return false
            }
        }
    }

    return true
}

export const generatePosition = (positions, minDist = 5, factors = { x: 50, y: 20, z: 100, z_tweak: 1 }) => {
    let point = new Vector3()
    let iterations = 0

    do {
        let x = (Math.random() - 0.5) * factors.x
        let y = (Math.random() - 0.5) * factors.y
        let z = (Math.random() - factors.z_tweak) * factors.z

        point.set(x, y, z)

        iterations += 1
    } while (!testPosition(positions, point, minDist) || iterations < 1000)

    return point
}

export const generateRotation = () => {
    let rot = new Vector3()

    const x = (Math.PI / 180) * (Math.random() * 360)
    const y = (Math.PI / 180) * (Math.random() * 360)
    const z = (Math.PI / 180) * (Math.random() * 360)

    rot.set(x, y, z)

    return rot
}