export const deepEqual = (x: {}, y: {}): boolean => {
    const strObj1 = JSON.stringify(x)
    const strObj2 = JSON.stringify(y)
    return strObj1 === strObj2
}
