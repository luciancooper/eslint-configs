# @lcooper/eslint-config-react

[![npm][npm-badge]][npm-link]
[![license][license-badge]][license-link]

An [ESlint shareable config](https://eslint.org/docs/developer-guide/shareable-configs) for React projects. Extends [`@lcooper/eslint-config`](https://www.npmjs.com/package/@lcooper/eslint-config).

## Installation

This config requires you install the peer dependencies [`eslint`](https://www.npmjs.com/package/eslint), [`eslint-plugin-import`](https://www.npmjs.com/package/eslint-plugin-import), [`eslint-plugin-jsdoc`](https://www.npmjs.com/package/eslint-plugin-jsdoc), and [`eslint-plugin-react`](https://www.npmjs.com/package/eslint-plugin-react).

Install with `npx`:

```bash
npx install-peerdeps --dev @lcooper/eslint-config-react
```

Install with `npm`:

```bash
npm install --save-dev @lcooper/eslint-config-react eslint eslint-plugin-import eslint-plugin-jsdoc eslint-plugin-react
```

## Usage

Add an `.eslintrc` or `.eslintrc.js` file to the root folder of your project:

`.eslintrc`

```json
{
  "extends": "@lcooper/eslint-config-react"
}
```

`.eslintrc.js`

```javascript
module.exports = {
    extends: '@lcooper/eslint-config-react',
};
```

Or use the  `eslintConfig` field in your `package.json` file:

```json
"eslintConfig": {
  "extends": "@lcooper/eslint-config-react"
}
```

Check out [this page](https://eslint.org/docs/user-guide/configuring) for more details about configuring eslint.

## Related

[@lcooper/eslint-config](https://www.npmjs.com/package/@lcooper/eslint-config) - Core eslint config for non React projects

[npm-link]: https://www.npmjs.com/package/@lcooper/eslint-config-react
[npm-badge]: https://img.shields.io/npm/v/@lcooper/eslint-config-react?logo=npm&style=for-the-badge
[license-link]: ../../LICENSE
[license-badge]: https://img.shields.io/github/license/luciancooper/eslint-config?color=brightgreen&style=for-the-badge