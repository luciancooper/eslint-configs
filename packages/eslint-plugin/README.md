# @lcooper/eslint-plugin

[![npm][npm-badge]][npm-link]
[![license][license-badge]][license-link]

Awesome extra [ESLint](https://eslint.org) rules.

## Installation

> install with npm:
```bash
npm install -D eslint @lcooper/eslint-plugin
```

> install with yarn:
```bash
yarn add -D eslint @lcooper/eslint-plugin
```

## Usage

Add `@lcooper/eslint-plugin` or just `@lcooper` to the plugins section of your ESLint configuration file.

Next, configure the rules you want to use under the `rules` section, or use the `plugin:@lcooper/all` bundled config that enables all plugin rules and disables any conflicting base ESLint rules. This can be configured using the `extends` property in your `.eslintrc` config file:

```json
{
  "plugins": [
    "@lcooper"
  ],
  "extends": [
    "plugin:@lcooper/all"
  ]
}
```

## Rules

:wrench: = Fixable

| Name | Description | |
| :-- | :-- | :--: |
| [`consecutive-declarations`](./docs/rules/consecutive-declarations.md) | Enforce a consistent style for consecutive `const`, `let`, and `var` declarations | :wrench: |
| [`global-require`](./docs/rules/global-require.md) | Ensure `require()` calls are in the top-level module scope | |
| [`top-level-padding-lines`](./docs/rules/top-level-padding-lines.md) | Require or disallow empty lines between top level statements | :wrench: |

## Related

ESLint configs that utilize this plugin:

 * [`@lcooper/eslint-config`](https://www.npmjs.com/package/@lcooper/eslint-config) - Base config for standard JavaScript projects
 * [`@lcooper/eslint-config-react`](https://www.npmjs.com/package/@lcooper/eslint-config-react) - Config for React projects
 * [`@lcooper/eslint-config-typescript`](https://www.npmjs.com/package/@lcooper/eslint-config-typescript) - Config for TypeScript projects
 * [`@lcooper/eslint-config-typescript-react`](https://www.npmjs.com/package/@lcooper/eslint-config-typescript-react) - Config for TypeScript + React projects
 * [`@lcooper/eslint-config-jest`](https://www.npmjs.com/package/@lcooper/eslint-config-jest) - Enhancement config for projects using Jest

[npm-link]: https://www.npmjs.com/package/@lcooper/eslint-plugin
[npm-badge]: https://img.shields.io/npm/v/@lcooper/eslint-plugin?logo=npm&style=for-the-badge
[license-link]: LICENSE
[license-badge]: https://img.shields.io/github/license/luciancooper/eslint-configs?color=brightgreen&style=for-the-badge
