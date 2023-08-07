// // Libraries
// import { createContext } from 'react'
// // Utisl
// import { api } from '~/utils/api'
//
// interface CmsContextProps {
//     data: { [key: string]: string }
//     isLoading: boolean
// }
//
// const CmsContext = createContext<CmsContextProps | null>(null)
//
// const { Provider } = CmsContext
//
// export default function CmsProvider({ children }: { children: JSX.Element }) {
//     const { data, isLoading } = api.cms.fetchData.useQuery()
//
//     return (
//         <Provider
//             value={{
//                 data: data || {},
//                 isLoading
//             }}
//         >
//             <div>{children}</div>
//         </Provider>
//     )
// }
