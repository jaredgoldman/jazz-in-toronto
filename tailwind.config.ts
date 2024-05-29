import { Config } from 'tailwindcss'

export default {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    mode: 'jit',
    purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
    darkMode: 'class',
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
                '1/11': '9.09091%',
                dropdown: 'var(--radix-popper-anchor-width)'
            },
            backgroundImage: {
                'hero-pattern-dark':
                    "linear-gradient(to bottom, rgb(0, 0, 0, 0.25), var(--slate-1)), url('../../public/images/jit-no-logo.png')",
                'hero-pattern-dark-2':
                    'linear-gradient(to bottom, var(--slate-1), var(--orange-2))',
                'gradient-overlay':
                    "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('../../public/images/jit-no-logo.png')"
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
