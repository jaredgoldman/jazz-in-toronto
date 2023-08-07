import { GraphQLClient } from 'graphql-request'
import { env } from '~/env.mjs'
import { type TypedDocumentNode } from '@graphql-typed-document-node/core'
import { type Exact } from '~/gql/graphql'

const client = new GraphQLClient(`${env.CMS_API_URL}/graphql`, {
    headers: {
        Authorization: `Bearer ${env.CMS_API_KEY}`
    }
})

export async function graphQlWithAuth<T>(
    query: TypedDocumentNode<T, Exact<{ [key: string]: never }>>
) {
    return await client.request(query)
}
