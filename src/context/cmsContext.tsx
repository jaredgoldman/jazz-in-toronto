// Libraries
import { createContext } from 'react'

const initialCmsContext = {}
const CmsContext = createContext(initialCmsContext)

const { Provider } = CmsContext

export default function CmsProvider({ children }: { children: JSX.Element }) {
    const cmsData = {}
    return (
        <Provider value={cmsData}>
            <div>{children}</div>
        </Provider>
    )
}
