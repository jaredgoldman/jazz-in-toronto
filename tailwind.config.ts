import { type Config } from 'tailwindcss'

export default {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        fontFamily: {
            body: 'var(--body-font)'
        },
        extend: {
            keyframes: {
                spin: {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' }
                }
            },
            width: {
                '1/11': '9.09091%'
            }
        },
        animation: {
            spin: 'spin 1s linear infinite'
        }
    },
    plugins: []
} satisfies Config
