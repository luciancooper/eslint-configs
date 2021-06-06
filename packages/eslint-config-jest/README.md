# @lcooper/eslint-config-jest

[![npm][npm-badge]][npm-link]
[![license][license-badge]][license-link]

An ESlint [shareable config](https://eslint.org/docs/developer-guide/shareable-configs) for [Jest](https://jestjs.io/) testing environments.

For use in conjunction with [`@lcooper/eslint-config`](https://www.npmjs.com/package/@lcooper/eslint-config) or [`@lcooper/eslint-config-react`](https://www.npmjs.com/package/@lcooper/eslint-config-react).

## Installation

The peer dependencies [`eslint`](https://www.npmjs.com/package/eslint) and [`eslint-plugin-jest`](https://www.npmjs.com/package/eslint-plugin-jest) must be installed alongside this package.

Install with `npx`:

```bash
npx install-peerdeps --dev @lcooper/eslint-config-jest
```

Or with `npm`:

```bash
npm install --save-dev @lcooper/eslint-config-jest eslint eslint-plugin-jest
```

Or with `yarn`:

```bash
yarn add --dev @lcooper/eslint-config-jest eslint eslint-plugin-jest
```

This package is intended to enhance one of these base configs:

 * [`@lcooper/eslint-config`](https://www.npmjs.com/package/@lcooper/eslint-config) - for standard JavaScript projects
 * [`@lcooper/eslint-config-react`](https://www.npmjs.com/package/@lcooper/eslint-config-react) - for React projects

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

For react projects, replace `@lcooper/eslint-config` with `@lcooper/eslint-config-react` in the examples above.

Check out [this page](https://eslint.org/docs/user-guide/configuring) for more details about configuring eslint.

[npm-link]: https://www.npmjs.com/package/@lcooper/eslint-config-jest
[npm-badge]: https://img.shields.io/npm/v/@lcooper/eslint-config-jest?logo=npm&style=for-the-badge
[license-link]: LICENSE
[license-badge]: https://img.shields.io/github/license/luciancooper/eslint-configs?color=brightgreen&style=for-the-badge
