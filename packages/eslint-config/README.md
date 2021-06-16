# @lcooper/eslint-config

[![npm][npm-badge]][npm-link]
[![license][license-badge]][license-link]

An ESlint [shareable config](https://eslint.org/docs/developer-guide/shareable-configs) that extends [`eslint-config-airbnb-base`](https://www.npmjs.com/package/eslint-config-airbnb-base).

## Installation

The peer dependencies [`eslint`](https://www.npmjs.com/package/eslint) and [`eslint-plugin-import`](https://www.npmjs.com/package/eslint-plugin-import) must be installed alongside this package.

> install with npm:
```bash
npm install -D @lcooper/eslint-config eslint eslint-plugin-import
```

> install with yarn:
```bash
yarn add -D @lcooper/eslint-config eslint eslint-plugin-import
```

#### Linting JSDoc Comments

If you want to lint [JSDoc](https://jsdoc.app) comments, then also install the peer dependency [`eslint-plugin-jsdoc`](https://www.npmjs.com/package/eslint-plugin-jsdoc).

```bash
npm install -D eslint-plugin-jsdoc
# or
yarn add -D eslint-plugin-jsdoc
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

No additional configuration is required to lint JSDoc comments, the only requirement being that [`eslint-plugin-jsdoc`](https://www.npmjs.com/package/eslint-plugin-jsdoc) is installed as a dev dependency.

Check out [this page](https://eslint.org/docs/user-guide/configuring) for more details about configuring eslint.

## Related

 * [`@lcooper/eslint-plugin`](https://www.npmjs.com/package/@lcooper/eslint-plugin) - plugin with awesome extra ESLint rules used by this config
 * [`@lcooper/eslint-config-react`](https://www.npmjs.com/package/@lcooper/eslint-config-react) - config for React projects
 * [`@lcooper/eslint-config-typescript`](https://www.npmjs.com/package/@lcooper/eslint-config-typescript) - config for TypeScript projects
 * [`@lcooper/eslint-config-typescript-react`](https://www.npmjs.com/package/@lcooper/eslint-config-typescript-react) - config for TypeScript + React projects
 * [`@lcooper/eslint-config-jest`](https://www.npmjs.com/package/@lcooper/eslint-config-jest) - enhancement config for projects using Jest

[npm-link]: https://www.npmjs.com/package/@lcooper/eslint-config
[npm-badge]: https://img.shields.io/npm/v/@lcooper/eslint-config?logo=npm&style=for-the-badge
[license-link]: LICENSE
[license-badge]: https://img.shields.io/github/license/luciancooper/eslint-configs?color=brightgreen&style=for-the-badge
