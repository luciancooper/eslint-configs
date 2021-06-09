# @lcooper/eslint-config

[![npm][npm-badge]][npm-link]
[![license][license-badge]][license-link]

An ESlint [shareable config](https://eslint.org/docs/developer-guide/shareable-configs) that extends [`eslint-config-airbnb-base`](https://www.npmjs.com/package/eslint-config-airbnb-base).

## Installation

The peer dependencies [`eslint`](https://www.npmjs.com/package/eslint), [`eslint-plugin-import`](https://www.npmjs.com/package/eslint-plugin-import), and [`eslint-plugin-jsdoc`](https://www.npmjs.com/package/eslint-plugin-jsdoc) must be installed alongside this package.

Install with `npx`:

```bash
npx install-peerdeps --dev @lcooper/eslint-config
```

Or with `npm`:

```bash
npm install --save-dev @lcooper/eslint-config eslint eslint-plugin-import eslint-plugin-jsdoc
```

Or with `yarn`:

```bash
yarn add --dev @lcooper/eslint-config eslint eslint-plugin-import eslint-plugin-jsdoc
```

## Rule Sets

| Name                             | Description                         | Source                   |
|:---------------------------------|:------------------------------------|:-------------------------|
| `@lcooper/eslint-config`         | Base config for node environments   | [index.js](index.js)     |
| `@lcooper/eslint-config/browser` | Config for browser environments     | [browser.js](browser.js) | 

## Usage

Add an [eslint config file](https://eslint.org/docs/user-guide/configuring/configuration-files) to your project's root directory:

`.eslintrc.js`

```javascript
module.exports = {
    extends: '@lcooper/eslint-config',
};
```

Or use the  `eslintConfig` field in your `package.json` file:

```json
"eslintConfig": {
  "extends": "@lcooper/eslint-config"
}
```

For browser environments, replace `@lcooper/eslint-config` with `@lcooper/eslint-config/browser`.

Check out [this page](https://eslint.org/docs/user-guide/configuring) for more details about configuring eslint.

## Related

 * [`@lcooper/eslint-config-react`](https://www.npmjs.com/package/@lcooper/eslint-config-react) - config for React projects
 * [`@lcooper/eslint-config-typescript`](https://www.npmjs.com/package/@lcooper/eslint-config-typescript) - config for TypeScript projects
 * [`@lcooper/eslint-config-jest`](https://www.npmjs.com/package/@lcooper/eslint-config-jest) - enhancement config for projects using Jest

[npm-link]: https://www.npmjs.com/package/@lcooper/eslint-config
[npm-badge]: https://img.shields.io/npm/v/@lcooper/eslint-config?logo=npm&style=for-the-badge
[license-link]: LICENSE
[license-badge]: https://img.shields.io/github/license/luciancooper/eslint-configs?color=brightgreen&style=for-the-badge
