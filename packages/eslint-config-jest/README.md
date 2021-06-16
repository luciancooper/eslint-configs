# @lcooper/eslint-config-jest

[![npm][npm-badge]][npm-link]
[![license][license-badge]][license-link]

An ESlint [shareable config](https://eslint.org/docs/developer-guide/shareable-configs) for [Jest](https://jestjs.io/) testing environments.

## Installation

The peer dependencies [`eslint`](https://www.npmjs.com/package/eslint) and [`eslint-plugin-jest`](https://www.npmjs.com/package/eslint-plugin-jest) must be installed alongside this package.

> install with npm:
```bash
npm install -D @lcooper/eslint-config-jest eslint eslint-plugin-jest
```

> install with yarn:
```bash
yarn add -D @lcooper/eslint-config-jest eslint eslint-plugin-jest
```

This package is intended to enhance one of these base configs:

 * [`@lcooper/eslint-config`](https://www.npmjs.com/package/@lcooper/eslint-config) - for standard JavaScript projects
 * [`@lcooper/eslint-config-react`](https://www.npmjs.com/package/@lcooper/eslint-config-react) - for React projects
 * [`@lcooper/eslint-config-typescript`](https://www.npmjs.com/package/@lcooper/eslint-config-typescript) - for TypeScript projects
 * [`@lcooper/eslint-config-typescript-react`](https://www.npmjs.com/package/@lcooper/eslint-config-typescript-react) - for TypeScript + React projects

## Usage

Add an [eslint config file](https://eslint.org/docs/user-guide/configuring/configuration-files) to your project's root directory:

`.eslintrc.js`

```javascript
module.exports = {
    extends: [
        '@lcooper/eslint-config',
        '@lcooper/eslint-config-jest'
    ],
};
```

Or use the  `eslintConfig` field in your `package.json` file:

```json
"eslintConfig": {
  "extends": [
    "@lcooper/eslint-config",
    "@lcooper/eslint-config-jest"
  ]
}
```

For React and/or TypeScript projects, replace `@lcooper/eslint-config` with `@lcooper/eslint-config-react`, `@lcooper/eslint-config-typescript`, or `@lcooper/eslint-config-typescript-react` in the examples above.

Check out [this page](https://eslint.org/docs/user-guide/configuring) for more details about configuring eslint.

[npm-link]: https://www.npmjs.com/package/@lcooper/eslint-config-jest
[npm-badge]: https://img.shields.io/npm/v/@lcooper/eslint-config-jest?logo=npm&style=for-the-badge
[license-link]: LICENSE
[license-badge]: https://img.shields.io/github/license/luciancooper/eslint-configs?color=brightgreen&style=for-the-badge
