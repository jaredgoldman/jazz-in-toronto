import type { CodegenConfig } from '@graphql-codegen/cli'
import { env } from '~/env.mjs'

const config: CodegenConfig = {
    overwrite: true,
    schema: `${env.CMS_API_URL}/graphql`,
    documents: 'src/**/*.ts?(x)',
    generates: {
        'src/gql/': {
            preset: 'client',
            plugins: []
        }
    }
}

export default config
