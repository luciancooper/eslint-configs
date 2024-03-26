# @lcooper/eslint-plugin

[![npm](https://img.shields.io/npm/v/@lcooper/eslint-plugin?logo=npm&style=for-the-badge)](https://www.npmjs.com/package/@lcooper/eslint-plugin)
[![ci](https://img.shields.io/github/actions/workflow/status/luciancooper/eslint-configs/ci.yml?logo=github&style=for-the-badge)](https://github.com/luciancooper/eslint-configs/actions/workflows/ci.yml)
[![license](https://img.shields.io/github/license/luciancooper/eslint-configs?color=yellow&style=for-the-badge)](#license)

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

#### Configuration (legacy `.eslintrc`):

Add `@lcooper/eslint-plugin` or just `@lcooper` to the plugins section of your `eslintrc` configuration file.

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

#### Configuration (new `eslint.config.js`):

If you are using the new flat config system, you can add the bundled `all/flat` config to the exported config array in your `eslint.config.js` file:

```js
const plugin = require('@lcooper/eslint-plugin');

module.exports = [
    // ... other configs
    plugin.configs['all/flat'],
];
```

## Rules

:wrench: = Fixable

| Name | Description | |
| :-- | :-- | :--: |
| [`consecutive-declarations`](docs/rules/consecutive-declarations.md) | Enforce a consistent style for consecutive `const`, `let`, and `var` declarations | :wrench: |
| [`global-require`](docs/rules/global-require.md) | Ensure `require()` calls are in the top-level module scope | |
| [`prefer-template`](docs/rules/prefer-template.md) | Suggest using template literals instead of string concatenation | :wrench: |
| [`top-level-padding-lines`](docs/rules/top-level-padding-lines.md) | Require or disallow empty lines between top level statements | :wrench: |

## Related

ESLint configs that utilize this plugin:

 * [`@lcooper/eslint-config`](../eslint-config) - Base config for standard JavaScript projects
 * [`@lcooper/eslint-config-react`](../eslint-config-react) - Config for React projects
 * [`@lcooper/eslint-config-typescript`](../eslint-config-typescript) - Config for TypeScript projects
 * [`@lcooper/eslint-config-typescript-react`](../eslint-config-typescript-react) - Config for TypeScript + React projects
 * [`@lcooper/eslint-config-jest`](../eslint-config-jest) - Enhancement config for projects using Jest

## License

[MIT](../../LICENSE)
