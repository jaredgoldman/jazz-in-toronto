// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

/** @type {import("eslint").Linter.Config} */
const config = {
    overrides: [
        {
            extends: [
                'plugin:@typescript-eslint/recommended-requiring-type-checking'
            ],
            files: ['*.ts', '*.tsx'],
            parserOptions: {
                project: path.join(__dirname, 'tsconfig.json')
            }
        }
    ],
    ignorePatterns: ['node_modules', 'src/gql/**/*.ts'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: path.join(__dirname, 'tsconfig.json')
    },
    plugins: ['@typescript-eslint'],
    extends: ['next/core-web-vitals', 'plugin:@typescript-eslint/recommended'],
    rules: {
        '@typescript-eslint/consistent-type-imports': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        'react/no-unescaped-entities': 'off',
        '@typescript-eslint/no-extra-non-null-assertion': 'off',
        '@typescript-eslint/no-misused-promises': [
            2,
            {
                checksVoidReturn: {
                    attributes: false
                }
            }
        ],
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-unused-vars': [
            'warn',
            { argsIgnorePattern: '^_' }
        ]
    }
}

module.exports = config
