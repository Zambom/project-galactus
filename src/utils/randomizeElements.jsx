import { GALAXY_BOUND_COLORS, GALAXY_CORE_COLORS } from "./constants"

export const randomGalaxy = () => {
    const coreFactor = Math.round(Math.random() * 6)
    const boundFactor = Math.round(Math.random() * 6)

    const branches = Math.round((Math.random() + 0.5) * 4)
    const speed = Math.max(Math.random(), .2)
    const direction = Math.round(Math.random()) * 2 - 1
    const insideColor = GALAXY_CORE_COLORS[coreFactor]
    const outsideColor = GALAXY_BOUND_COLORS[boundFactor]

    return {
        branches,
        speed,
        direction,
        insideColor,
        outsideColor
    }
}