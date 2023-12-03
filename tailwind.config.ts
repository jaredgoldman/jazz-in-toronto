import { Config } from 'tailwindcss'

export default {
    darkMode: 'class',
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
            },
            backgroundImage: {
                'hero-pattern':
                    "linear-gradient(to bottom, rgba(0, 0, 0, 0.1), theme('colors.gray.900')), url('../../public/images/jit-gig.jpg')"
            }
        },
        animation: {
            spin: 'spin 1s linear infinite'
        }
    },
    plugins: []
} satisfies Config
