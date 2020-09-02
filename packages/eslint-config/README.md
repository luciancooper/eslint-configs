# @lcooper/eslint-config

[![npm][npm-badge]][npm-link]
[![license][license-badge]][license-link]

An [ESlint shareable config](https://eslint.org/docs/developer-guide/shareable-configs) that extends [`eslint-config-airbnb-base`](https://www.npmjs.com/package/eslint-config-airbnb-base).

## Installation

This config requires you install the peer dependencies [`eslint`](https://www.npmjs.com/package/eslint), [`eslint-plugin-import`](https://www.npmjs.com/package/eslint-plugin-import), and [`eslint-plugin-jsdoc`](https://www.npmjs.com/package/eslint-plugin-jsdoc).

Install with `npx`:

```bash
npx install-peerdeps --dev @lcooper/eslint-config
```

Install with `npm`:

```bash
npm install --save-dev @lcooper/eslint-config eslint eslint-plugin-import eslint-plugin-jsdoc
```

## Rule Sets

| Name                             | Description                         | Source                   |
|:---------------------------------|:------------------------------------|:-------------------------|
| `@lcooper/eslint-config`         | Base config for node environments   | [index.js](index.js)     |
| `@lcooper/eslint-config/browser` | Config for browser environments     | [browser.js](browser.js) | 

## Usage

Add an `.eslintrc` or `.eslintrcjs` file to the root folder of your project:

`.eslintrc`

```json
{
  "extends": "@lcooper/eslint-config"
}
```

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

[`@lcooper/eslint-config-react`](https://www.npmjs.com/package/@lcooper/eslint-config-react) - ESLint config for React projects

[npm-link]: https://www.npmjs.com/package/@lcooper/eslint-config
[npm-badge]: https://img.shields.io/npm/v/@lcooper/eslint-config?logo=npm&style=for-the-badge
[license-link]: ../../LICENSE
[license-badge]: https://img.shields.io/github/license/luciancooper/eslint-config?color=brightgreen&style=for-the-badge