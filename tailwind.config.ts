import { type Config } from 'tailwindcss'

export default {
    darkMode: 'class',
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--body-font)'],
                mono: ['var(--secondary-font)']
            },
            keyframes: {
                spin: {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' }
                },
                navlinkIn: {
                    '0%': { width: '0' },
                    '100%': { width: '100%' }
                },
                navlinkOut: {
                    '0%': { width: '100%' },
                    '100%': { width: '0' }
                }
            },
            width: {
                '1/11': '9.09091%'
            }
        },
        animation: {
            spin: 'spin 1s linear infinite',
            navlinkIn: 'navlinkIn 0.3s ease-in-out 1 forwards',
            navlinkOut: 'navlinkOut 0.3s ease-in-out'
        }
    },
    plugins: [],
    important: true
} satisfies Config
