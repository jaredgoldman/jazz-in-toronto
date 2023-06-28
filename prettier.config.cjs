/** @type {import("prettier").Config} */
const config = {
    plugins: [require.resolve("prettier-plugin-tailwindcss")],
    singleQuote: false,
    tabWidth: 4,
};

module.exports = config;
