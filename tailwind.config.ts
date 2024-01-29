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
                },
                swipeOut: {
                    from: { transform: 'translateX(0)' },
                    to: { transform: 'translateX(200%)' }
                },
                fadeIn: {
                    from: { opacity: '0' },
                    to: { opacity: '1' }
                }
            },
            width: {
                '1/11': '9.09091%'
            },
            backgroundImage: {
                'hero-pattern':
                    "linear-gradient(to bottom, rgba(0, 0, 0, 0.25), theme('colors.gray.900')), url('../../public/images/jit-no-logo.png')",
                'hero-pattern-2':
                    "linear-gradient(to bottom, theme('colors.gray.900'), rgba(0, 0, 0, 0.1)), url('../../public/images/emmet.jpg')"
            }
        },
        animation: {
            spin: 'spin 1s linear infinite',
            swipeOut: 'swipeOut 0.5s ease-in-out forwards',
            fadeIn: 'fadeIn 0.4s ease-in-out forwards'
        }
    },
    plugins: []
} satisfies Config
