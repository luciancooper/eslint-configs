# @lcooper/eslint-config-react

[![npm][npm-badge]][npm-link]
[![license][license-badge]][license-link]

An ESlint [shareable config](https://eslint.org/docs/developer-guide/shareable-configs) for React projects. Extends [`@lcooper/eslint-config`](/packages/eslint-config).

## Installation

The peer dependencies [`eslint`](https://www.npmjs.com/package/eslint), [`eslint-plugin-import`](https://www.npmjs.com/package/eslint-plugin-import), [`eslint-plugin-react`](https://www.npmjs.com/package/eslint-plugin-react), and [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks) must be installed alongside this package.

> install with npm:
```bash
npm install -D @lcooper/eslint-config-react eslint eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks
```

> install with yarn:
```bash
yarn add -D @lcooper/eslint-config-react eslint eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks
```

#### Linting JSDoc Comments

If you want to lint [JSDoc](https://jsdoc.app) comments, then also install the peer dependency [`eslint-plugin-jsdoc`](https://www.npmjs.com/package/eslint-plugin-jsdoc).

```bash
npm install -D eslint-plugin-jsdoc
# or
yarn add -D eslint-plugin-jsdoc
```

## Usage

Add an [eslint config file](https://eslint.org/docs/user-guide/configuring/configuration-files) to your project's root directory:

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

No additional configuration is required to lint JSDoc comments, the only requirement being that [`eslint-plugin-jsdoc`](https://www.npmjs.com/package/eslint-plugin-jsdoc) is installed as a dev dependency.

Check out [this page](https://eslint.org/docs/user-guide/configuring) for more details about configuring ESLint.

## Related

 * [`@lcooper/eslint-config`](/packages/eslint-config) - Base config for standard JavaScript projects
 * [`@lcooper/eslint-plugin`](/packages/eslint-plugin) - Plugin with awesome extra ESLint rules used by this config
 * [`@lcooper/eslint-config-typescript`](/packages/eslint-config-typescript) - Config for TypeScript projects
 * [`@lcooper/eslint-config-typescript-react`](/packages/eslint-config-typescript-react) - Config for TypeScript + React projects
 * [`@lcooper/eslint-config-jest`](/packages/eslint-config-jest) - Enhancement config for projects using Jest

[npm-link]: https://www.npmjs.com/package/@lcooper/eslint-config-react
[npm-badge]: https://img.shields.io/npm/v/@lcooper/eslint-config-react?logo=npm&style=for-the-badge
[license-link]: LICENSE
[license-badge]: https://img.shields.io/github/license/luciancooper/eslint-configs?color=brightgreen&style=for-the-badge
