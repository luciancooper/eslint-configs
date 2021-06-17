# @lcooper/eslint-config-typescript

[![npm][npm-badge]][npm-link]
[![ci][ci-badge]][ci-link]
[![license][license-badge]][license-link]

An ESlint [shareable config](https://eslint.org/docs/developer-guide/shareable-configs) for [TypeScript](https://www.typescriptlang.org) projects. Extends [`@lcooper/eslint-config`](/packages/eslint-config). For projects using React check out [`@lcooper/eslint-config-typescript-react`](/packages/eslint-config-typescript-react).

## Installation

The peer dependencies [`eslint`](https://www.npmjs.com/package/eslint), [`eslint-plugin-import`](https://www.npmjs.com/package/eslint-plugin-import), [`@typescript-eslint/parser`](https://www.npmjs.com/package/@typescript-eslint/parser), and [`@typescript-eslint/eslint-plugin`](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) must be installed alongside this package.

> install with npm:
```bash
npm install -D @lcooper/eslint-config-typescript eslint eslint-plugin-import @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

> install with yarn:
```bash
yarn add -D @lcooper/eslint-config-typescript eslint eslint-plugin-import @typescript-eslint/parser @typescript-eslint/eslint-plugin
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
    extends: '@lcooper/eslint-config-typescript',
    parserOptions: {
        project: './tsconfig.eslint.json',
    },
};
```

If you get an error that says: `The file must be included in at least one of the projects provided`, it means that you are attempting to lint a file that is not covered by your `typescript.eslint.json` configuration. For more details, read [this section](https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/TYPED_LINTING.md#i-get-errors-telling-me-the-file-must-be-included-in-at-least-one-of-the-projects-provided) of the typescript-eslint docs.

**Linting TSDoc / JSDoc comments**

No additional configuration is required to lint TSDoc and/or JSDoc comments, the only requirement being that their respective plugins are installed as dev dependencies.

## Related

 * [`@lcooper/eslint-config`](/packages/eslint-config) - Base config for standard JavaScript projects
 * [`@lcooper/eslint-plugin`](/packages/eslint-plugin) - Plugin with awesome extra ESLint rules used by this config
 * [`@lcooper/eslint-config-react`](/packages/eslint-config-react) - Config for React projects
 * [`@lcooper/eslint-config-typescript-react`](/packages/eslint-config-typescript-react) - Config for TypeScript + React projects
 * [`@lcooper/eslint-config-jest`](/packages/eslint-config-jest) - Enhancement config for projects using Jest

[npm-link]: https://www.npmjs.com/package/@lcooper/eslint-config-typescript
[npm-badge]: https://img.shields.io/npm/v/@lcooper/eslint-config-typescript?logo=npm&style=for-the-badge
[ci-link]: https://github.com/luciancooper/eslint-configs/actions/workflows/ci.yml
[ci-badge]: https://img.shields.io/github/workflow/status/luciancooper/eslint-configs/CI?logo=github&style=for-the-badge
[license-link]: LICENSE
[license-badge]: https://img.shields.io/github/license/luciancooper/eslint-configs?color=yellow&style=for-the-badge
