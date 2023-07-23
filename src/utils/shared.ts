export const deepEqual = (x: {}, y: {}): boolean => {
    const strObj1 = JSON.stringify(x)
    const strObj2 = JSON.stringify(y)
    return strObj1 === strObj2
}

export const wait = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
}
