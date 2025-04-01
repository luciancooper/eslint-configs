# @lcooper/eslint-config-typescript-react

[![npm](https://img.shields.io/npm/v/@lcooper/eslint-config-typescript-react?logo=npm&style=for-the-badge)](https://www.npmjs.com/package/@lcooper/eslint-config-typescript-react)
[![ci](https://img.shields.io/github/actions/workflow/status/luciancooper/eslint-configs/ci.yml?logo=github&style=for-the-badge)](https://github.com/luciancooper/eslint-configs/actions/workflows/ci.yml)
[![license](https://img.shields.io/github/license/luciancooper/eslint-configs?color=yellow&style=for-the-badge)](#license)

An ESlint [shareable flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new) for [TypeScript](https://www.typescriptlang.org) React projects. An extension of the rules from [`@lcooper/eslint-config-react`](../eslint-config-react).

## Installation

The peer dependency [`eslint`](https://www.npmjs.com/package/eslint) must be installed alongside this package.

> install with npm:
```bash
npm install -D eslint @lcooper/eslint-config-typescript-react
```

> install with yarn:
```bash
yarn add -D eslint @lcooper/eslint-config-typescript-react
```

This config is meant to be used in addition to the base [`@lcooper/eslint-config-typescript`](../eslint-config-typescript) config, so that should be installed as well.

> Note: This project requires Eslint version `>=9.7`, NodeJS version `^18.18.0 || ^20.9.0 || >=21.1.0`, and Typescript version `>=4.8.4`.

## Usage

Add an `eslint.config.js` config file to your project's root directory.

> Note: this package exports a single flat config object, so no need for the `...` spread syntax when using it.

```js
import baseConfig from '@lcooper/eslint-config-typescript';
import reactConfig from '@lcooper/eslint-config-typescript-react';

export default [
    ...baseConfig,
    reactConfig,
];
```

If your project does not specify `"type": "module"` in its `package.json` file, then `eslint.config.js` must be in CommonJS format:

```js
const baseConfig = require('@lcooper/eslint-config-typescript'),
    reactConfig = require('@lcooper/eslint-config-typescript-react');

module.exports = [
    ...baseConfig,
    reactConfig,
];
```

Check out the docs for [`@lcooper/eslint-config-typescript`](../eslint-config-typescript) for more information on configuring eslint to lint with type information.

This project is no longer compatable with the legacy eslintrc format, and requires you use the flat config format. Check out [this page](https://eslint.org/docs/latest/use/configure/migration-guide) for more details about migrating from the eslintrc format to the flat config format.

## File Matching

By default, this config matches `.js`, `.mjs`, `.jsx`, `.ts`, `.mts`, and `.tsx` files using the glob `**/*.{js,mjs,jsx,ts,mts,tsx}`. More specificity can be achieved by overwriting the [`files`](https://eslint.org/docs/latest/use/configure/configuration-files-new#specifying-files-and-ignores) option with your own globs, like in this example:

```js
import baseConfig from '@lcooper/eslint-config-typescript';
import reactConfig from '@lcooper/eslint-config-typescript-react';

export default [
    ...baseConfig,
    {
        ...reactConfig,
        files: ['src/**/*.{js,mjs,jsx,ts,mts,tsx}'],
    },
];
```

## Related

 * [`@lcooper/eslint-config`](../eslint-config) - Base config for standard JavaScript projects
 * [`@lcooper/eslint-config-react`](../eslint-config-react) - Enhancement config for React projects
 * [`@lcooper/eslint-config-typescript`](../eslint-config-typescript) - Base config for TypeScript projects
 * [`@lcooper/eslint-config-jest`](../eslint-config-jest) - Enhancement config for projects using Jest
 * [`@lcooper/eslint-plugin`](../eslint-plugin) - Plugin with awesome extra ESLint rules

## License

[MIT](../../LICENSE)
