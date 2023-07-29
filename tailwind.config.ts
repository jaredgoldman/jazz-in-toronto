import { type Config } from 'tailwindcss'

export default {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        fontFamily: {
            body: 'var(--body-font)'
        },
        extend: {}
    },
    plugins: []
} satisfies Config
