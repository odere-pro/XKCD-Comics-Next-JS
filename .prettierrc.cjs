module.exports = {
    arrowParens: 'avoid',
    bracketSpacing: true,
    endOfLine: 'lf',
    plugins: ['prettier-plugin-tailwindcss'],
    printWidth: 100,
    proseWrap: 'always',
    semi: false,
    singleQuote: true,
    tabWidth: 4,
    trailingComma: 'all',
    useTabs: false,
    overrides: [
        {
            files: '*.md',
            options: {
                tabWidth: 2,
            },
        },
    ],
}
