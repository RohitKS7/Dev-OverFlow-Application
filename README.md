## About Project

## Project Code Structure

- `page.tsx` within `/app/(root)/(home)` folder is acting as a entry point, so we don't need `page.tsx` within `/app` folder.

- `(auth)` contains Authentication setup using Clerk.

- `/components/shared` folder contians only those component which we wanna share across the application.

- `Context` => Context is a React library which by default is client-side, But Next.js is server-side.

Then What to do...?

## Package Installations

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

### Authentication

1. We're using `Clerk` authentication services for easier and better auth process. Everything is happening according to docs available on Clerk's website, So for any questions visit the site.

2. Installation > Wrapping app in `clerkProvider` > Adding API in `.env` file > Adding SignIn & SignUp component > Adding UserButton component.

> TIPS :

- Start by modifying favicon, title etc. in layout.tsx

- After everything is installed do `ctrl+shift+p` in vs-code and run `relod window`

- Always remember to do `stash (untracked included)` which will remove all changes made in application before creating a new branch and in new branch do `stash (latest)` to add all the previous changes. Next publish the branch.

- Create `layout.tsx` for the pages where we don't want the navbar or footer. For instance in `(auth)` folder which is a entry point for sign-up and sign-in.

- [Next.js Documentation](https://nextjs.org/docs)
