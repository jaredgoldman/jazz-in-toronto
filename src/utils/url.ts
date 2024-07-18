export const simplifyURL = (url: string) => {
    url = stripHttp(url)
    url = stripEndingSlash(url)
    url = stripWWW(url)
    if (url.endsWith('/')) {
        url = url.slice(0, -1)
    }

    return url
}

export const stripWWW = (url: string) => {
    if (url.startsWith('www.')) {
        url = url.substring(4)
    }
    return url
}

export const stripEndingSlash = (url: string) => {
    if (url.endsWith('/')) {
        url = url.slice(0, -1)
    }
    return url
}

export const stripHttp = (url: string) => {
    if (url.startsWith('https://')) {
        url = url.substring(8)
    }
    if (url.startsWith('http://')) {
        url = url.substring(7)
    }
    return url
}

export const stripFbUrl = (url: string) => {
    url = stripHttp(url)
    url = stripEndingSlash(url)
    if (url.startsWith('facebook.com')) {
        url = url.substring(11)
    }
    if (url.startsWith('www.facebook.com')) {
        url = url.substring(16)
    }
    url = url.replace('/', '')
    return url
}

export const processIGHandle = (handle: string | null) => {
    let withAt = ''
    let withoutAt = ''

    if (handle) {
        if (!handle.startsWith('@')) {
            withAt = `@${handle}`
            withoutAt = handle
        } else {
            withAt = handle
            withoutAt = handle.replace('@', '')
        }
    }

    return {
        withAt,
        withoutAt
    }
}
