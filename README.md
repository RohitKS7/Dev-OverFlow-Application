# Next.js 14 DevOverflow

<!-- GitHub badges -->

[![Latest release](https://img.shields.io/github/v/release/RohitKS7/devflow-application?label=Latest%20release&style=social)](https://github.com/RohitKS7/devflow-application/releases/tag/v1.0.0)
[![Stars](https://img.shields.io/github/stars/RohitKS7/devflow-application?style=social)](https://github.com/RohitKS7/devflow-application/stargazers)
[![Fork](https://img.shields.io/github/forks/RohitKS&/devflow-application?style=social)](https://github.com/RohitKS7/devflow-application/forks)
[![GitHub commits](https://img.shields.io/github/commit-activity/t/RohitKS7/devflow-application?style=social&logo=github)](https://github.com/RohitKS7/devflow-application/commits)
[![Pull requests](https://img.shields.io/github/issues-pr/RohitKS7/devflow-application?style=social&logo=github)](https://github.com/RohitKS7/devflow-application/pulls)

![demo](https://i.ibb.co/NxHSLDg/dev-Over-Flow-cover.jpg)

[![RohitKS7](https://custom-icon-badges.demolab.com/badge/made%20by%20-RohitKS7-556bf2?logo=github&logoColor=white&labelColor=101827)](https://github.com/RohitKS7)
[![Top Language](https://img.shields.io/github/languages/top/RohitKS7/devflow-application?logo=github&logoColor=%23007ACC&label=TypeScript)](https://www.typescriptlang.org/)
[![Contributors](https://img.shields.io/github/contributors/RohitKS7/devflow-application?style=flat&color=lightcoral&label=Contributors)](https://github.com/RohitKS7/devflow-application/graphs/contributors)

![Release](https://img.shields.io/github/release/RohitKS7/devflow-application.svg)
![PRs](https://img.shields.io/badge/PRs-welcome-ff69b4.svg?style=shields)
![deployment](https://img.shields.io/github/deployments/RohitKS7/devflow-application/Production?logo=vercel&label=Website)
[![Known Vulnerabilities](https://snyk.io/test/github/RohitKS7/devflow-application/badge.svg)](https://snyk.io/test/github/RohitKS7/devflow-application)

## 🌐 Live Demo

Explore the live demonstration of my project: [nextjs14-devoverflow-by-rohit](https://nextjs14-devoverflow-by-rohit.vercel.app/)

## 📝 Description

**DevOverflow** is a complex Q&A platform for developers to ask questions, share knowledge, and learn from each other. It is built with Next.js, Tailwind CSS, Clerk, MongoDB, and more.

## Project Code Structure


<details><summary><b>Folder Structure</b></summary>

```bash
nextjs14-devoverflow/
├── app/
├   ├── page.tsx(Intro Page for Web-Application)
├   ├── globals.css
├   ├── layout.tsx
├   ├── (auth)/
├   ├   ├── sign-in/[[...sign-in]]/
├   ├   ├   └── page.tsx
├   ├   ├── sign-up/[[...sign-up]]/
├   ├   ├   └── page.tsx
├   ├   └── layout.tsx
├   ├── (root)/
├   ├   ├── layout.tsx
├   ├   ├── home/
├   ├   ├   ├── loading.tsx
├   ├   ├   └── page.tsx
├   ├   ├── ask-question/
├   ├   ├   └── page.tsx
├   ├   ├── collection/
├   ├   ├   ├── loading.tsx
├   ├   ├   └── page.tsx
├   ├   ├── community/
├   ├   ├   ├── loading.tsx
├   ├   ├   └── page.tsx
├   ├   ├── profile/
├   ├   ├   ├── [id]/
├   ├   ├   ├   ├── loading.tsx
├   ├   ├   ├   └── page.tsx
├   ├   ├   └── edit/
├   ├   ├       └── page.tsx
├   ├   ├── question/
├   ├   ├   ├── [id]/
├   ├   ├   ├   └── page.tsx
├   ├   ├   └── edit/
├   ├   ├       └── [id]/
├   ├   ├           └── page.tsx
├   ├   └── tags/
├   ├       ├── [id]/
├   ├       ├   ├── loading.tsx
├   ├       ├   └── page.tsx
├   ├       ├── page.tsx
├   ├       └── loading.tsx
├   └── api/
├       ├── chatgpt/
├       ├   └── route.ts
├       └── webhook/
├              └── route.ts
├── components/
├   ├── cards/
├   ├   ├── AnswerCard.tsx
├   ├   ├── QuestionCard.tsx
├   ├   └── UserCard.tsx
├   ├── forms/
├   ├   ├── Answer.tsx
├   ├   ├── Profile.tsx
├   ├   └── Question.tsx
├   ├── home/
├   ├   ├── HomeFilters.tsx
├   ├── shared/
├   ├   ├── AllAnswers.tsx
├   ├   ├── AnswersTab.tsx
├   ├   ├── EditDeleteAction.tsx
├   ├   ├── Filter.tsx
├   ├   ├── LeftSidebar.tsx
├   ├   ├── Metric.tsx
├   ├   ├── NoResult.tsx
├   ├   ├── Pagination.tsx
├   ├   ├── ParseHTML.tsx
├   ├   ├── ProfileLink.tsx
├   ├   ├── QuestionsTab.tsx
├   ├   ├── RenderTag.tsx
├   ├   ├── RightSidebar.tsx
├   ├   ├── Stats.tsx
├   ├   ├── Votes.tsx
├   ├   ├── navbar/
├   ├   ├   ├── Navbar.tsx
├   ├   ├   ├── Mobile.tsx
├   ├   ├   └── Theme.tsx
├   ├   └── search/
├   ├       ├── GlobalFilters.tsx
├   ├       ├── GlobalResult.tsx
├   ├       ├── GlobalSearch.tsx
├   ├       └── LocalSearchbar.tsx
├   └── ui/ (generated by shadcn-ui)
├       ├── badge.tsx
├       ├── button.tsx
├       ├── card.tsx
├       ├── carousel.tsx
├       ├── form.tsx
├       ├── input.tsx
├       ├── label.tsx
├       ├── menubar.tsx
├       ├── select.tsx
├       ├── sheet.tsx
├       ├── skeleton.tsx
├       ├── switch.tsx
├       ├── tabs.tsx
├       ├── textarea.tsx
├       ├── toast.tsx
├       ├── toaster.tsx
├       └── use-toast.ts
├── constants/
├   ├── filters.ts
├   └── index.ts
├── context/
├   └── ThemeProvider.ts
├── datbase/
├   ├── answer.model.ts
├   ├── interaction.model.ts
├   ├── question.model.ts
├   ├── tag.model.ts
├   └── user.model.ts
├── lib/
├   ├── mongoose.ts
├   ├── utils.ts
├   ├── validations.ts
├   └── actions/
├       ├── answer.action.ts
├       ├── general.action.ts
├       ├── interaction.action.ts
├       ├── question.action.ts
├       ├── tag.action.ts
├       ├── user.action.ts
├       └── shared.types.d.ts
├── public/
├   ├── next.svg
├   ├── vercel.svg
├   └── assets/
├       ├── icons/[[...]].svg
├       └── images/[[...]].{svg,png}
├── styles/
├   ├── prism.css
├   └── theme.css
├── types/
├   └── index.d.ts
├── .eslintrc.json
├── .gitignore
├── README.md
├── components.json
├── middleware.ts
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.ts
```
</details>

#### Client Side

- `page.tsx` within `/app` folder is acting as a entry point which is a Intro Landing Page.

- `(auth)` contains Authentication setup using Clerk.

- `/components/shared` folder contains only those component which we wanna share across the application.

- `Context` components => Context is a React library which by default is client-side, But Next.js is server-side so don't forget to use `"use client"`.

- `/app/api` contains "Webhooks" which is Connecting our 'Clerk-user-database' to 'MongoDb-database'

- `/app/api/webhooks` contains webhooks which is connecting our 'clerk database' and 'mongoDB database'.

- `/app/api/chatgpt` since chatgpt is paid now, I'm using chatgpt API from RapidAPI which is still free for 500 uses. **(HEHEHE)**

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

## ⚙️ Package Installations

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

## ✨ Technologies Used

<details><summary><b>DevOverflow</b> is built using the following technologies:</summary>

- [TypeScript](https://www.typescriptlang.org/): TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.
- [Next.js](https://nextjs.org/): Next.js is a React framework for building server-side rendered and statically generated web applications.
- [Tailwind CSS](https://tailwindcss.com/): Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces.
- [ESLint](https://eslint.org/): ESLint is a static code analysis tool for identifying problematic patterns found in JavaScript code.
- [Prettier](https://prettier.io/): Prettier is an opinionated code formatter.
- [Clerk](https://clerk.dev/): Clerk is a developer-first authentication API that handles all the logic for user sign up, sign in, and more.
- [Shadcn-UI](https://ui.shadcn.com/): Shadcn UI is a React UI library that helps developers rapidly build modern web applications.
- [TinyMCE](https://www.tiny.cloud/): TinyMCE is the world's most popular JavaScript library for rich text editing.
- [MongoDB](https://www.mongodb.com/): MongoDB is a general purpose, document-based, distributed database built for modern application developers and for the cloud era.
- [Mongoose](https://mongoosejs.com/): Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.
- [Prism.js](https://prismjs.com/): Prism is a lightweight, extensible syntax highlighter, built with modern web standards in mind.
- [Query String](https://www.npmjs.com/package/query-string): Parse and stringify URL query strings.
- [Svix](https://svix.com/): Svix is a webhook proxy that allows you to receive webhooks locally.
- [Zod](https://zod.dev/): Zod is a TypeScript-first schema declaration and validation library.
- [Vercel](https://vercel.com/): Vercel is a cloud platform for frontend developers, providing the frameworks, workflows, and infrastructure to build a faster, more personalized Web.

</details><br/>

[![Technologies Used](https://skillicons.dev/icons?i=ts,nextjs,tailwind,mongodb,vercel,ts)](https://skillicons.dev)

## 🧰 Get Started

To get this project up and running in your development environment, follow these step-by-step instructions.

### 📋 Prerequisites

In order to install and run this project locally, you would need to have the following installed on your local machine.

- [Node.js](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/get-npm)
- [Git](https://git-scm.com/downloads)

### ⚙️ Installation and Run Locally

**Step 0:**

> [!IMPORTANT]
> - the application uses Clerk for Authentication and User Management, therefore, you need to create Clerk account [here](https://clerk.dev/) and sets the `CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` environment variables in `.env` file. Also, the different URLs for the Clerk sign-in, sign-up, after sign-in and after sign-up pages.
> - the application uses a MongoDB database, therefore, you need to create a database and connect it to the application, for this, change the `MONGODB_URL` environment variable in `.env` file located in `server` folder.
> - the application uses TinyMCE, therefore, you need to create TinyMCE account [here](https://www.tiny.cloud/) and sets the `NEXT_PUBLIC_TINYMCE_API_KEY` environment variable in `.env` file.
> - the application uses OpenAI API, therefore, you need to create OpenAI account [here](https://openai.com/) and sets the `OPENAI_API_KEY` environment variable in `.env` file.
> - the application uses RapidAPI, therefore, you need to create RapidAPI account [here](https://rapidapi.com/), subscribe to the [JSearch API](https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch/) and sets the `RAPIDAPI_API_KEY` environment variable in `.env` file.

After following all the instructions above, we'll want to create a new webhook on Clerk. To do this, go to the [Clerk Dashboard](https://dashboard.clerk.dev/), click on the "Webhooks" tab, and then click "Add Endpoint". For the Endpoint URL, enter `http://<PASTE-YOUR-LINK-HERE>/api/webhook/clerk`. For the events, select the "user". Then click "Create" to create the webhook. get the signing secret and set it as `CLERK_WEBHOOK_SECRET` environment variable in `.env` file.

**Step 1:**

Download or clone this repo by using the link below:

```bash
git clone https://github.com/RohitKS7/devflow-application.git
```

**Step 2:**

Execute the following command in the root directory of the downloaded repo in order to install dependencies:

```bash
npm install
```

**Step 3:**

Execute the following command in order to run the development server locally:

```bash
npm run dev
```

**Step 4:**

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 📜 Scripts

All scripts are defined in the `package.json` file. Here is a list of all scripts:

| Script          | Action                                      |
| :-------------- | :------------------------------------------ |
| `npm install`   | Installs dependencies                       |
| `npm run dev`   | Starts local dev server at `localhost:3000` |
| `npm run build` | Build your production site to `./dist/`     |
| `npm run start` | Start your production site locally          |
| `npm run lint`  | Run ESLint                                  |

## 🔒 Environment Variables

Environment variables[^12] can be used for configuration. They must be set before running the app.

> [Environment variables](https://en.wikipedia.org/wiki/Environment_variable) are variables that are set in the operating system or shell, typically used to configure programs.

**DevOverflow** uses [Clerk](https://clerk.com), [TinyMCE](https://uploadthing.com/), [RapidAPI](https://rapidapi.com), [OpenAI API](https://openai.com/blog/openai-api) and [MongoDB](https://mongodb.com) as external services. You need to create an account on each of these services and get the required credentials to run the app.

Create a `.env` file in the root directory of the project and add the following environment variables:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<CLERK_PUBLISHABLE_KEY>
CLERK_SECRET_KEY=<CLERK_SECRET_KEY>
NEXT_CLERK_WEBHOOK_SECRET=<CLERK_WEBHOOK_SECRET>

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

NEXT_PUBLIC_TINY_MCE_API_KEY=<YOUR_TINY_MCE_API_KEY>

MONGODB_URL=<YOUR_MONGODB_URL>

NEXT_PUBLIC_SERVER_URL=<YOUR_SERVER_URL>

OPENAI_API_KEY=<YOUR_OPENAI_API_KEY>

RAPID_API_KEY=<YOUR_RAPID_API_KEY>
```

## 🚀 Deployment

#### Deploy to production (manual)

You can create an optimized production build with the following command:

```bash
npm run build
```

#### Deploy on Vercel (recommended)

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/RohitKS7/devflow-application/)

#### Deploy on Netlify

You can also deploy this Next.js app with [Netlify](https://www.netlify.com/).

[![Deploy with Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/RohitKS7/devflow-application/)

Check out [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## 🔧 Contributing

[![contributors](https://contrib.rocks/image?repo=RohitKS7/devflow-application)](https://github.com/RohitKS7/devflow-application/graphs/contributors)

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

To fix a bug or enhance an existing module, follow these steps:

1. Fork the repo
2. Create a new branch (`git checkout -b improve-feature`)
3. Make the appropriate changes in the files
4. Commit your changes (`git commit -am 'Improve feature'`)
5. Push to the branch (`git push origin improve-feature`)
6. Create a Pull Request 🎉

### 📩 Bug / Feature Request

If you find a bug (failure of a module to execute its intended function), kindly open an issue [here](https://github.com/RohitKS7/devflow-application/issues/new) by including the issue with a title and clear description.

If you'd like to request a new function, feel free to do so by opening an issue [here](https://github.com/RohitKS7/devflow-application/issues/new). Please include sample queries and their corresponding results.

## 💎 Acknowledgements

I'd like to express my gratitude to the following people who helped me with this project and made it possible:

- [Clerk](https://clerk.dev/)
- [MongoDB](https://mongodb.com)
- [Mongoose](https://mongoosejs.com/)
- [Zod](https://zod.dev/)
- [Shadcn](https://shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Svix](https://svix.com/)
- [TinyMCE](https://www.tiny.cloud/)
- [OpenAI API](https://openai.com/blog/openai-api)
- [RapidAPI](https://rapidapi.com/)
- [Vercel](https://vercel.com/)
- [JavaScript Mastery](https://www.jsmastery.pro/)

## 📚 References

JSMastery. (2023). [Ultimate Next.js 14 Course | Become a top 1% Next.js 14 developer](https://www.jsmastery.pro/ultimate-next-course). E-Learning.

## 📞 Connect With Me

[![LinkedIn](https://img.shields.io/badge/LinkedIn-rohitkumarsuman-blue?style=flat&logo=linkedin&logoColor=b0c0c0&labelColor=363D44)](https://linkedin.com/in/rohit-kumar-suman)
[![X (formerly Twitter) Follow](https://img.shields.io/twitter/follow/SumanRohitK7)](https://x.com/SumanRohitK7)



> TIPS :

- Start by modifying favicon, title etc. in layout.tsx
