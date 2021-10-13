# @lcooper/eslint-config-jest

[![npm](https://img.shields.io/npm/v/@lcooper/eslint-config-jest?logo=npm&style=for-the-badge)](https://www.npmjs.com/package/@lcooper/eslint-config-jest)
[![ci](https://img.shields.io/github/workflow/status/luciancooper/eslint-configs/CI?logo=github&style=for-the-badge)](https://github.com/luciancooper/eslint-configs/actions/workflows/ci.yml)
[![license](https://img.shields.io/github/license/luciancooper/eslint-configs?color=yellow&style=for-the-badge)](#license)

An ESlint [shareable config](https://eslint.org/docs/developer-guide/shareable-configs) for [Jest](https://jestjs.io/) testing environments.

## Installation

The peer dependencies [`eslint`](https://www.npmjs.com/package/eslint) and [`eslint-plugin-jest`](https://www.npmjs.com/package/eslint-plugin-jest) must be installed alongside this package.

> install with npm:
```bash
npm install -D @lcooper/eslint-config-jest eslint eslint-plugin-jest
```

> install with yarn:
```bash
yarn add -D @lcooper/eslint-config-jest eslint eslint-plugin-jest
```

## Usage

Add `@lcooper/eslint-config-jest` to the `extends` section of your [eslint config file](https://eslint.org/docs/user-guide/configuring/configuration-files):

`.eslintrc.js`

```js
module.exports = {
    extends: [
        // ... base config ...
        '@lcooper/eslint-config-jest'
    ],
};
```

This config is meant to be used on top of a base ESLint configuration. Under the hood, it uses an `overrides` block to apply itself only to files matched by the following glob patterns: 

 * `**/setupTests.[jt]s?(x)` → Test setup files.
 * `**/jest.setup.[jt]s?(x)` → Test setup files.
 * `**/test?(s)/**/*.[jt]s?(x)` → Directories named `test` / `tests`.
 * `**/__@(tests\|mocks)__/**/*.[jt]s?(x)` → Directories named `__tests__` / `__mocks__`.
 * `**/+(*.)@(spec\|test).[jt]s?(x)` → Files with a `.test.*` / `.spec.*` suffix.
 * `**/test.[jt]s?(x)` → Files named `test`.

> **Note:** the pattern `.[jt]s?(x)` matches the file extensions `.js`, `.jsx`, `.ts`, and `.tsx`.

Additionally, this config is not applied to any files matched by `**/fixtures/**` or `**/__fixtures__/**`.

#### Custom Overrides

If you would like to control what files this config is applied to, you can extend `@lcooper/eslint-config-jest/config` in an `overrides` block and use your own glob patterns:

`.eslintrc.js`

```js
module.exports = {
    overrides: [{
        files: [
            // ... your globs here ...
        ],
        extends: [
            '@lcooper/eslint-config-jest/config',
        ],
    }],
};
```

For more information about using `overrides` check out the [Configuration Based on Glob Patterns](https://eslint.org/docs/user-guide/configuring/configuration-files#configuration-based-on-glob-patterns) section of the ESLint docs.

## Related

This package is intended to enhance one of these base configs:

 * [`@lcooper/eslint-config`](../eslint-config) - Config for standard JavaScript projects
 * [`@lcooper/eslint-config-react`](../eslint-config-react) - Config for React projects
 * [`@lcooper/eslint-config-typescript`](../eslint-config-typescript) - Config for TypeScript projects
 * [`@lcooper/eslint-config-typescript-react`](../eslint-config-typescript-react) - Config for TypeScript + React projects

## License

[MIT](../../LICENSE)
