import { useEffect } from "react"

/**
 * Hook to load a script from a url
 */
const useScript = (url: string, defer: boolean) => {
    useEffect(() => {
        const script = document.createElement("script")

        script.src = url
        script.async = true
        script.defer = defer

        document.body.appendChild(script)

        return () => {
            document.body.removeChild(script)
        }
    }, [url])
}

export default useScript
