# @lcooper/eslint-config-typescript-react

[![npm](https://img.shields.io/npm/v/@lcooper/eslint-config-typescript-react?logo=npm&style=for-the-badge)](https://www.npmjs.com/package/@lcooper/eslint-config-typescript-react)
[![ci](https://img.shields.io/github/workflow/status/luciancooper/eslint-configs/CI?logo=github&style=for-the-badge)](https://github.com/luciancooper/eslint-configs/actions/workflows/ci.yml)
[![license](https://img.shields.io/github/license/luciancooper/eslint-configs?color=yellow&style=for-the-badge)](#license)

An ESlint [shareable config](https://eslint.org/docs/developer-guide/shareable-configs) for [TypeScript](https://www.typescriptlang.org) + React projects. A combination of the rules from [`@lcooper/eslint-config-react`](../eslint-config-react) and [`@lcooper/eslint-config-typescript`](../eslint-config-typescript), packaged into a single configuration.

## Installation

The peer dependencies [`eslint`](https://www.npmjs.com/package/eslint), [`eslint-plugin-import`](https://www.npmjs.com/package/eslint-plugin-import), [`eslint-plugin-react`](https://www.npmjs.com/package/eslint-plugin-react), [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks), [`@typescript-eslint/parser`](https://www.npmjs.com/package/@typescript-eslint/parser), and [`@typescript-eslint/eslint-plugin`](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) must be installed alongside this package.

> install with npm:
```bash
npm install -D @lcooper/eslint-config-typescript-react eslint eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

> install with yarn:
```bash
yarn add -D @lcooper/eslint-config-typescript-react eslint eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

Additionally, [`typescript`](https://www.npmjs.com/package/typescript) must be installed.

#### Linting TSDoc Comments

If you want to lint [tsdoc](https://tsdoc.org) comments in your TypeScript files, then also install the peer dependency [`eslint-plugin-tsdoc`](https://www.npmjs.com/package/eslint-plugin-tsdoc).

```bash
npm install -D eslint-plugin-tsdoc
# or
yarn add -D eslint-plugin-tsdoc
```

#### Linting JSDoc Comments

If you are working on a mixed codebase with both JavaScript and TypeScript files, and you want to lint [JSDoc](https://jsdoc.app) comments in your JavaScript files, then also install the peer dependency [`eslint-plugin-jsdoc`](https://www.npmjs.com/package/eslint-plugin-jsdoc).

```bash
npm install -D eslint-plugin-jsdoc
# or
yarn add -D eslint-plugin-jsdoc
```

## Usage

This config enables some of the type-aware rules provided by `@typescript-eslint/eslint-plugin`, so you must provide a tsconfig file to the `parserOptions.project` field in your [eslint config file](https://eslint.org/docs/user-guide/configuring/configuration-files).

The best way to do this is to create a `tsconfig.eslint.json` file that will just be used for linting. It can extend your base `tsconfig.json`.

`tsconfig.eslint.json`

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "noEmit": true
  },
  "include": ["**/*", ".eslintrc.js"]
}
```

Then, create an eslint config file in your project's root directory:

`.eslintrc.js`

```javascript
module.exports = {
    extends: '@lcooper/eslint-config-typescript-react',
    parserOptions: {
        project: './tsconfig.eslint.json',
    },
};
```

If you get an error that says: `The file must be included in at least one of the projects provided`, it means that you are attempting to lint a file that is not covered by your `typescript.eslint.json` configuration. For more details, read [this section of the typescript-eslint docs](https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/TYPED_LINTING.md#i-get-errors-telling-me-the-file-must-be-included-in-at-least-one-of-the-projects-provided).

**Linting TSDoc / JSDoc comments**

No additional configuration is required to lint TSDoc and/or JSDoc comments, the only requirement being that their respective plugins are installed as dev dependencies.

## Related

 * [`@lcooper/eslint-config`](../eslint-config) - Base config for standard JavaScript projects
 * [`@lcooper/eslint-plugin`](../eslint-plugin) - Plugin with awesome extra ESLint rules used by this config
 * [`@lcooper/eslint-config-react`](../eslint-config-react) - Config for React projects
 * [`@lcooper/eslint-config-typescript`](../eslint-config-typescript) - Config for standard TypeScript projects
 * [`@lcooper/eslint-config-jest`](../eslint-config-jest) - Enhancement config for projects using Jest

## License

[MIT](LICENSE)
