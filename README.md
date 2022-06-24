HarvestMonster is a Path of Exile Harvest craft management tool that helps you sell crafts on The Forbidden Trove. It is built on [Electron](https://www.electronjs.org/) with [Svelte](https://svelte.dev/), [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/), and [Tailwind](https://tailwindcss.com/).

![release](https://github.com/ryanbarr/harvest-monster/actions/workflows/release.yml/badge.svg) ![license](https://img.shields.io/github/license/ryanbarr/harvest-monster)

## Roadmap

First and foremost, this is a passion project built with the intent to meet three specific needs:

1. A non-intrusive way to quickly convert in-game crafts to an organized list of sellable crafts.
2. An efficient way to automatically list crafts for sale and update their status when sold.
3. A way to deliver quality-of-life enhancements to keep the player's focus on playing the game.

With that in mind, there are a handful of features and enhancements that should be considered in the future. Features being actively considered, discussed, and planned can be found [in the discussions section](https://github.com/ryanbarr/harvest-monster/discussions). Here are a few broad examples for enhancements and feature additions that may be considered:

* Application performance improvements, such as moving Tesseract into a web worker and instantiating it on initial load.
* Improved OCR configuration and training, such as supplying a character whitelist or experimenting with page segmentation modes.
* Enhanced support for Mac and Linux platforms, such as drag and drop support for screenshots.
* Potential community-focused features, such as a willing-to-buy section or player blacklist integration.
* New features that increase scope, such as sales history/statistics or support for bench crafts and player services.

## Contributions

HarvestMonster was built for the greater community and as such only gains to benefit from contributions from that same community. There are a number of ways that you can make an impact on HarvestMonster.

### Feedback, Feature Requests, and Bug Reports

* In the event you encounter a bug, strange behavior, or broken functionality please [submit a new issue](https://github.com/ryanbarr/harvest-monster/issues/new?&labels=bug&template=bug_report.md) on our issue tracker.
* If you have feedback to share or ideas you would like to propose, please [create a new discussion](https://github.com/ryanbarr/harvest-monster/discussions) on in our Discussion section.

### Translations

In some cases, our translations may be provided from generators such as [Google Translate](https://translate.google.com/). While these allow us to more quickly include members of the community who prefer languages other than English, the translations produced often fall short. This is often due to a loss of context, tone, or inflection and results in a jarring experience for our users.

* If you'd like to submit a correction for an existing language, please [open a bug report](https://github.com/ryanbarr/harvest-monster/issues/new?&labels=bug&template=bug_report.md) and detail the text that needs to change with your correction.
* If you're interested in supplying translations for a language that is not yet supported, please [create a new discussion](https://github.com/ryanbarr/harvest-monster/discussions) and note the language you'd like to work on.
* If you would like to do either of the tasks above and are comfortable working directly with `JSON` files, feel free to read our [Contributing Guide](CONTRIBUTING.md) and open a Pull Request.

### Development

See the [Contributing Guide](CONTRIBUTING.md) for information on how to help build HarvestMonster. Please consider also [reading the Wiki](https://github.com/ryanbarr/harvest-monster/wiki) which details some of our architectural considerations and additional context that you may find useful while working in the repository.
