// Libraries
import { createContext } from 'react'
// Utisl
import { api } from '~/utils/api'

interface CmsContextProps {
    data: any
    isLoading: boolean
}

const initialCmsContext: CmsContextProps = {
    data: null,
    isLoading: true
}

const CmsContext = createContext(initialCmsContext)

const { Provider } = CmsContext

export default function CmsProvider({ children }: { children: JSX.Element }) {
    const { data, isLoading } = api.cms.fetchData.useQuery()

    return (
        <Provider
            value={{
                data,
                isLoading
            }}
        >
            <div>{children}</div>
        </Provider>
    )
}
