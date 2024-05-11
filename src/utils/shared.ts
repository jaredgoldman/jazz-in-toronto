export const deepEqual = (x: object, y: object): boolean => {
    const strObj1 = JSON.stringify(x)
    const strObj2 = JSON.stringify(y)
    return strObj1 === strObj2
}

export const wait = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Adds https to the beginning of a URL if it is missing
 */
export const normalizeUrl = (url: string): string => {
    if (!url.startsWith('http')) {
        return `https://${url}`
    }
    return url
}
