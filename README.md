## About Project

DevOverFlow is a clone of StackOverflow.

## Project Code Structure

#### Client Side

- `page.tsx` within `/app` folder is acting as a entry point,

- `(auth)` contains Authentication setup using Clerk.

- `/components/shared` folder contians only those component which we wanna share across the application.

- `Context` components => Context is a React library which by default is client-side, But Next.js is server-side so don't forget to use `"use client"`.

- `/app/api` contains "Webhooks" which is Connecting our 'Clerk-user-database' to 'MongoDb-database'

- `/app/api/webhooks` contains webhooks which is connecting our 'clerk database' and 'mongoDB database'.

- `/app/(root)/question/[id]` is a dynamic route for question details page.

- `/app/api/webhooks` contains webhooks which is connecting our 'clerk database' and 'mongoDB database'.

#### Server Side

- Remember when creating a Server-action, Always connect to database first.

- don't forget to enable server actions in `next.config` like this

- `"use server"` in server-action function or on top of server-action separate file.

```bash
const nextConfig = {
  experimental: {
    // serverActions are available by default now, So the below experimental code is not required
    // serverActions: true,
    // Compile MDX files using the new Rust compiler.
    mdxRs: true,
    // Choose your own choice of backend library
    serverComponentsExternalPackages: ["mongoose"],
  },
};
```

- Visit this blog for understanding[Next.js Server-Actions Blog](https://makerkit.dev/blog/tutorials/nextjs-server-actions)

- `/lib/actions` this folder contains all of the Server Actions.

- `/lib/mongoose.ts` this file creates our Database

- `/database` folder contains all the database models

- don't forget to disable 'Vercel Authentication' which is acting as a thorn in sending requests from clerk webhook. and enable 'username' and 'name' in clerk dashboard to match the data pattern of 'userModel' of mongoDB collection.

## Package Installations

### ESLint

1.  Install "JavaScript Standard Style' for ESLint. Then add 'standard' in `.eslintrc.json`.

```bash
npm install eslint-config-standard
```

2. Run "ESLint" to check any potential errors & bug.

```bash
npm run lint
```

3. Tailwind plugin of "ESLint".
   Sometimes we write styles like this `min-h-screen flex-col flex` which is not a logical method to write tailwind and we have to read the whole class everytime. So, in order to maintain readability and logical pattern this Plugin comes in handy.
   After installation simply add it in your `.eslintrc.json` file.

```bash
npm install eslint-plugin-tailwindcss
```

4. To avoid conflicts between Prettier and ESLint, install.
   This will removes all "ESLint" rules that could conflict with Prettier. Once Installed, add "prettier" to your `.eslintrc.json` file.

```bash
npm install eslint-config-prettier
```

5. "Prism.js" is a fantastic code highlighting library. The code highlighting in question details page you are seeing! is done using "Prism.js"

```bash
npm install prismjs
```

6. "HTML-React-Parser" to convert an HTML string to one or more React elements.

```bash
npm install html-react-parser
```

example : Here as you can see instead of using built-in HTML parser property "creatElement()" we're using HTML-React-Parser for better and easier coding.

```bash
import parse from 'html-react-parser';

parse('<p>Hello, World!</p>'); // React.createElement('p', {}, 'Hello, World!')
```

7. "npm check updates" This will upgrades your packages.json dependencies to the latest versions. ignoring specified versions. And to run it just type

```bash
ncu
```

### Authentication

1. We're using `Clerk` authentication services for easier and better auth process. Everything is happening according to docs available on Clerk's website, So for any questions visit the site.

2. Installation > Wrapping app in `clerkProvider` > Adding API in `.env` file > Adding SignIn & SignUp component > Adding UserButton component.

### ShadCN Component Library

1. This is NOT a component library.

What do you mean by not a component library?

I mean you do not install it as a dependency. It is not available or distributed via npm.

Pick the components you need. Copy and paste the code into your project and customize to your needs. The code is yours.

2. We just have install each component we wanna use, So it's pretty damn light library without any heavy depencies

3. To install see the ShadCN [documentation](https://ui.shadcn.com/docs).

4. When you install this library, you'll see it overwrote your `global.css` and `tailwind.config.ts`. But Don't worry, Just copy and paste your old styles.

5. It'll add `/lib/utils.ts` in your code for better customization. and It'll also add `ui` in your component folder which contains ShadCN components.

### Webhooks Svix

- "Svix": provides a package for verifying the webhook signature, making it easy to verify the authenticity of the webhook events.

```bash
npm install svix
```

- For more info, Visit [Clerk Webhooks Guide](https://clerk.com/docs/integrations/webhooks/sync-data)

> TIPS :

- Start by modifying favicon, title etc. in layout.tsx

- After everything is installed do `ctrl+shift+p` in vs-code and run `relod window`

- Always remember to do `stash (untracked included)` which will remove all changes made in application before creating a new branch and in new branch do `stash (latest)` to add all the previous changes. Next publish the branch.

- Create `layout.tsx` for the pages where we don't want the navbar or footer. For instance in `(auth)` folder which is a entry point for sign-up and sign-in.
