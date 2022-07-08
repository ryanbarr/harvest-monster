# Contributing

Your contributions are always welcomed, encouraged, and appreciated! This document will outline:

* Recommended prerequisite knowledge
* Documentation and tooling used in the repository
* How to setup your development environment
* How to debug and test your changes
* How to submit a pull request

## Recommended prerequisite knowledge

If you're looking to jump into developing for HarvestMonster, we recommend having the following knowledge beforehand:

* Basic understanding of HTML and CSS.
* Intermediate understanding of JavaScript.

You'll find comfort in the code if you have:

* An understanding of [atomic design](https://bradfrost.com/blog/post/atomic-web-design/).
* Knowledge around strictly typed languages, because [TypeScript](https://www.typescriptlang.org/) is utilized for our stores.
* Experience with utility-first CSS, as we use [Tailwind](https://tailwindcss.com/).
* Familiarity with developing applications with [Electron](https://www.electronjs.org/).
* An understanding of Single Page Applications (SPAs), because we use [Svelte](https://svelte.dev/).

## How to setup your development environment

Before you get started with development, you must:

* Have [Node.js](https://nodejs.org/en/) installed. (We've tested with v16.14.x and up.)

Getting started with a development environment can be done in just a few steps:

1. Fork the repository
2. Clone your forked repository
3. Install dependencies with `npm i`
4. Run the development rig with `npm run watch`

### Useful commands for development

| Command | Description |
| -- | -- |
| npm run build | Manually rebuilds the main, preload, and renderer builds. |
| npm run compile | Compiles the app for your current operating system. |
| npm run watch | Runs the development rig and rebuilds the renderer on change. |

### Optional quality of life tools

If you're using [VSCode](https://code.visualstudio.com/) as your IDE, the following extensions may help improve your experience working in this repository.

* [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) applies our repo's code formatting rules for you.
* [Svelte for VSCode](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode) helps you stay inside the lines when working with Svelte.
* [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) adds auto-complete support for Tailwind classes.

## How to debug and test your changes

When using the development environment, there are three packages to adjust:

* `main` sets up the application, creates the web view, and loads the web app.
* `preload` acts as an intermediary between `main` and `renderer`, as it sets up prequisites and carefully exposes data, functions, and variables.
* `renderer` is the web application where you'll likely be spending most of your time adjusting the user interface.

### Things to consider

* When making adjustments to `main` and `preload`, you'll need to restart your `npm run watch` process as it does not monitor for changes and rebuild for these packages as it does for `renderer`.

## How to submit a pull request

Now that you've made and tested your changes, it's time to submit your code as a pull request. It is recommended that you make a new branch for each atomic change that you wish to request, as smaller, more focused pull requests are more likely to be approved and merged quickly.

1. Push your branch to your remote fork
2. Create a pull request into `main` from your fork's branch
3. If applicable, make sure any build steps against your branch complete without errors

Your PR will be reviewed and considered on a first come, first serve basis. Thank you for taking time to help improve our tool!
