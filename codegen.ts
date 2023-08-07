import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    overwrite: true,
    schema: 'http://127.0.0.1:1337/graphql',
    documents: 'src/**/*.ts?(x)',
    generates: {
        'src/gql/': {
            preset: 'client',
            plugins: []
        }
    }
}

export default config
