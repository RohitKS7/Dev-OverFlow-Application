## About Project

# Package Installations

### ESLint

1.  Install `JavaScript Standard Style` for ESLint. Then add 'standard' in `.eslintrc.json`.

```bash
npm install eslint-config-standard
```

2. Run ESLint to check any potential errors & bug.

```bash
npm run lint
```

3. Tailwind plugin of ESLint.
   Sometimes we write styles like this `min-h-screen flex-col flex` which is not a logical method to write tailwind and we have to read the whole class everytime. So, in order to maintain readability and logical pattern this Plugin comes in handy.
   After installation simply add it in your `.eslintrc.json` file.

```bash
npm install eslint-plugin-tailwindcss
```

4. To avoid conflicts between Prettier and ESLint, install.
   This will removes all ESLint rules that could conflict with Prettier. Once Installed, add "prettier" to your `.eslintrc.json` file.

```bash
npm install eslint-config-prettier
```

> TIPS :

1. After everything is installed do `ctrl+shift+p` in vs-code and run `relod window`

- [Next.js Documentation](https://nextjs.org/docs)
