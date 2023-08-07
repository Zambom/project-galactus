import { Vector3 } from "three"
import { GALAXY_BOUND_COLORS, GALAXY_CORE_COLORS, PLACEHOLDER_INFO_TEXT } from "./constants"

export const randomName = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const charLength = characters.length

    let result = ''

    let counter = 0;
    
    while (counter < length) {
        result = `${result}${characters.charAt(Math.floor(Math.random() * charLength))}`;
        
        counter += 1;
    }

    return result
}

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
        outsideColor,
        information: {
            title: `Galaxy ${randomName(5)}`,
            content: PLACEHOLDER_INFO_TEXT
        }
    }
}

export const randomStar = () => {
    const r_factor = Math.round((Math.random() + 1) * 3)
    const g_factor = Math.round((Math.random() + 1) * 3)
    const b_factor = Math.round((Math.random() + 1) * 3)

    const colorFactors = new Vector3(r_factor, g_factor, b_factor)

    return {
        colorFactors,
        information: {
            title: `Star ${randomName(6)}`,
            content: PLACEHOLDER_INFO_TEXT
        }
    }
}