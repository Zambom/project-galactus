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