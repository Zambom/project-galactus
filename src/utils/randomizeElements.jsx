import { Vector3 } from "three"
import { GALAXY_BOUND_COLORS, GALAXY_CORE_COLORS, PLACEHOLDER_INFO_TEXT } from "./constants"
import { generateOrbit } from "./positioning"

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

export const randomColor = () => {
    const r = Math.random()
    const g = Math.random()
    const b = Math.random()

    return new Vector3(r, g, b)
}

export const randomGalaxy = () => {
    const coreFactor = Math.floor(Math.random() * 6)
    const boundFactor = Math.floor(Math.random() * 6)

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

export const randomPlanet = (starSize = 5, orbits) => {
    const orbit = generateOrbit(orbits, starSize)
    return {
        type: Math.round(Math.random()),
        orbit,
        hasRings: Math.round(Math.random()),
        inclination: (Math.random() - 0.5) * Math.PI,
        rotation: (Math.random() - 0.5) / 1000,
        rockyType: Math.round(Math.random() * 5.0),
        gassyStrips: Math.random(),
        ringsBaseOpacity: Math.random() + 0.01,
        waterColor: randomColor(),
        landColor: randomColor(),
        peakColor: randomColor(),
        contrast: randomColor(),
        brightness: randomColor(),
        oscilation: randomColor(),
        phase: randomColor(),
        ringInnerColor: randomColor(),
        ringOuterColor: randomColor(),
        information: {
            title: `Planet ${randomName(10)}`,
            content: PLACEHOLDER_INFO_TEXT
        }
    }
}

