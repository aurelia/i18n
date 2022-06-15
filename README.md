<p>
  <a href="https://aurelia.io/" target="_blank">
    <img alt="Aurelia" src="https://aurelia.io/styles/images/aurelia.svg">
  </a>
</p>

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm Version](https://img.shields.io/npm/v/aurelia-i18n.svg)](https://www.npmjs.com/package/aurelia-i18n)
[![CircleCI](https://circleci.com/gh/aurelia/i18n/tree/port-to-typescript.svg?style=shield)](https://circleci.com/gh/aurelia/i18n/tree/port-to-typescript)
[![Discourse status](https://img.shields.io/discourse/https/meta.discourse.org/status.svg)](https://discourse.aurelia.io)
[![Twitter](https://img.shields.io/twitter/follow/aureliaeffect.svg?style=social&label=Follow)](https://twitter.com/intent/follow?screen_name=aureliaeffect)
[![Discord Chat](https://img.shields.io/discord/448698263508615178.svg)](https://discord.gg/RBtyM6u)
[![Coverage Status](https://coveralls.io/repos/github/aurelia/i18n/badge.svg?branch=port-to-typescript)](https://coveralls.io/github/aurelia/i18n?branch=port-to-typescript)

# aurelia-i18n

This library is part of the [Aurelia](http://www.aurelia.io/) platform and contains a plugin that provides i18n support.
Under the hood it uses the [i18next](http://i18next.com/) library.

You can find complete documentation on setup and usage in the official [Aurelia Developer Hub](http://aurelia.io/hub.html#/doc/article/aurelia/i18n/latest/i18n-with-aurelia)

> To keep up to date on [Aurelia](http://www.aurelia.io/), please visit and subscribe to [the official blog](http://blog.aurelia.io/) and [our email list](http://eepurl.com/ces50j). We also invite you to [follow us on twitter](https://twitter.com/aureliaeffect). If you have questions look around our [Discourse forums](https://discourse.aurelia.io/), chat in our [community on Discord](https://discord.gg/RBtyM6u) or use [stack overflow](http://stackoverflow.com/search?q=aurelia). Documentation can be found [in our developer hub](http://aurelia.io/docs).

## Polyfills

None

## Platform Support

This library can be used in the **browser** only.

## Building The Code
This library can be used in the **browser** and **node**.

## Building The Code

To build the code, follow these steps.

1. Ensure that [NodeJS](http://nodejs.org/) is installed. This provides the platform on which the build tooling runs.
2. From the project folder, execute the following command:

  ```shell
  npm install
  ```
3. To build the code, you can now run:

  ```shell
  npm run build
  ```
4. You will find the compiled code in the `dist` folder, available in various module formats and the `typings` inside the typings subfolder.


## Running The Tests

To run the unit tests, first ensure that you have followed the steps above in order to install all dependencies and successfully build the library. Once you have done that, proceed with these additional steps:

1. For single execution run:

  ```shell
  npm run test
  ```
2. For continuous tdd style:

  ```shell
  npm run test-watch
  ```
3. You can find the coverage report built after each test run:

  ```shell
  cat /test/coverage-jest/index.html
  ```  
