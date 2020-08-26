# @lcooper/eslint-config

[![npm][npm-badge]][npm-link]
[![license][license-badge]][license-link]

A [shareable config](https://eslint.org/docs/developer-guide/shareable-configs) for [ESLint](https://eslint.org) that extends [`eslint-config-airbnb-base`](https://www.npmjs.com/package/eslint-config-airbnb-base).

## Installation

Installation requires the peer dependencies [`eslint`](https://www.npmjs.com/package/eslint) and [`eslint-plugin-import`](https://www.npmjs.com/package/eslint-plugin-import).

Install with `npx`:

```bash
npx install-peerdeps --dev @lcooper/eslint-config
```

Install with `npm`:

```bash
npm install --save-dev eslint eslint-plugin-import @lcooper/eslint-config
```

## Usage

Add the `eslintConfig` field to your `package.json` file:

```json
"eslintConfig": {
  "extends": "@lcooper"
}
```

Or create an eslint config file type of your choice in the root folder of your project:

`.eslintrc`

```json
{
  "extends": "@lcooper"
}
```

`.eslintrc.js`

```javascript
module.exports = {
    extends: '@lcooper',
};
```

Check out [this page](https://eslint.org/docs/user-guide/configuring) for more details about configuring eslint.

## Scripts

Add a script to your `package.json` file.

```json
"scripts": {
  "lint:js": "eslint ."
}
```

[npm-link]: https://www.npmjs.com/package/@lcooper/eslint-config
[npm-badge]: https://img.shields.io/npm/v/@lcooper/eslint-config?logo=npm&style=for-the-badge
[license-link]: ../../LICENSE
[license-badge]: https://img.shields.io/github/license/luciancooper/eslint-config?color=brightgreen&style=for-the-badge