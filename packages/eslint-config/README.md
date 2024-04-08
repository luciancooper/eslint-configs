# @lcooper/eslint-config

[![npm](https://img.shields.io/npm/v/@lcooper/eslint-config?logo=npm&style=for-the-badge)](https://www.npmjs.com/package/@lcooper/eslint-config)
[![ci](https://img.shields.io/github/actions/workflow/status/luciancooper/eslint-configs/ci.yml?logo=github&style=for-the-badge)](https://github.com/luciancooper/eslint-configs/actions/workflows/ci.yml)
[![license](https://img.shields.io/github/license/luciancooper/eslint-configs?color=yellow&style=for-the-badge)](#license)

An ESlint [shareable flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new) that extends [`eslint-config-airbnb-base`](https://www.npmjs.com/package/eslint-config-airbnb-base).

## Installation

The peer dependency [`eslint`](https://www.npmjs.com/package/eslint) must be installed alongside this package.

> install with npm:
```bash
npm install -D eslint @lcooper/eslint-config
```

> install with yarn:
```bash
yarn add -D eslint @lcooper/eslint-config
```

> Note: This project requires Eslint version `>=8.56`, and NodeJS version `^18.18.0 || >=20.0.0`.

## Usage

Add an `eslint.config.js` config file to your project's root directory:

```js
import config from '@lcooper/eslint-config';

export default [
    ...config,
];
```

If your project does not specify `"type": "module"` in its `package.json` file, then `eslint.config.js` must be in CommonJS format:

```js
const config = require('@lcooper/eslint-config');

module.exports = [
    ...config,
];
```

To add browser globals for browser environments, import additional configuration from `@lcooper/eslint-config/envs`.

```js
import config from '@lcooper/eslint-config';
import { browser } from '@lcooper/eslint-config/envs';

export default [
    ...config,
    browser,
];
```

This project is no longer compatable with the legacy eslintrc format, and requires you use the flat config format. Check out [this page](https://eslint.org/docs/latest/use/configure/migration-guide) for more details about migrating from the eslintrc format to the flat config format.

## Related

 * [`@lcooper/eslint-plugin`](../eslint-plugin) - Plugin with awesome extra ESLint rules used by this config
 * [`@lcooper/eslint-config-react`](../eslint-config-react) - Enhancement config for React projects
 * [`@lcooper/eslint-config-typescript`](../eslint-config-typescript) - Base config for TypeScript projects
 * [`@lcooper/eslint-config-typescript-react`](../eslint-config-typescript-react) - Enhancement config for React projects that use TypeScript
 * [`@lcooper/eslint-config-jest`](../eslint-config-jest) - Enhancement config for projects using Jest

## License

[MIT](../../LICENSE)
