const plugin = require('eslint-plugin-jest');

const { globals } = plugin.environments.globals;

module.exports = {
    files: [
        '**/setupTests.?([cm])[jt]s?(x)',
        '**/jest.setup.?([cm])[jt]s?(x)',
        '**/test?(s)/**/*.?([cm])[jt]s?(x)',
        '**/__@(tests|mocks)__/**/*.?([cm])[jt]s?(x)',
        '**/+(*.)@(spec|test).?([cm])[jt]s?(x)',
        '**/test.?([cm])[jt]s?(x)',
    ],
    ignores: [
        '**/fixtures/**',
        '**/__fixtures__/**',
    ],
    plugins: {
        jest: plugin,
    },
    languageOptions: {
        globals,
    },
    rules: {
        // Have control over `test` and `it` usages
        'jest/consistent-test-it': [2, {
            fn: 'test',
            withinDescribe: 'test',
        }],
        // Enforce assertion to be made in a test body
        'jest/expect-expect': 2,
        // Enforces a maximum number assertion calls in a test body
        'jest/max-expects': 0,
        // Enforces a maximum depth to nested describe calls
        'jest/max-nested-describe': 0,
        // Disallow specific jest. methods
        'jest/no-restricted-jest-methods': 0,
        // Disallow using expect outside of it or test blocks
        'jest/no-standalone-expect': 2,
        // Disallow use of deprecated functions
        'jest/no-deprecated-functions': 2,
        // Enforce valid `describe()` callback
        'jest/valid-describe-callback': 2,
        // Enforce valid `expect()` usage
        'jest/valid-expect': [2, {
            alwaysAwait: true,
            minArgs: 1,
            maxArgs: 1,
        }],
        // Prevent calling expect conditionally
        'jest/no-conditional-expect': 2,
        // Disallow conditional logic in tests
        'jest/no-conditional-in-test': 0,
        // Avoid using a callback in asynchronous tests and hooks
        'jest/no-done-callback': 2,
        // Enforce having return statement when testing with promises
        'jest/valid-expect-in-promise': 2,
        // Disallow explicitly returning from tests
        'jest/no-test-return-statement': 2,
        // Disallow Jasmine globals
        'jest/no-jasmine-globals': 2,
        // Disallow using exports in files containing tests
        'jest/no-export': 2,
        // Enforce explicit imports from `@jest/globals` (added v28.1)
        'jest/prefer-importing-jest-globals': 0,
        // Prefer using .each rather than manual loops
        'jest/prefer-each': 2,
        // Suggest using `test.todo`
        'jest/prefer-todo': 2,
        // Use `.only` and `.skip` over f and x
        'jest/no-test-prefixes': 2,
        // Disallow commented out tests
        'jest/no-commented-out-tests': 1,
        // Disallow confusing usage of `jest.setTimeout`
        'jest/no-confusing-set-timeout': 2,
        // Disallow disabled tests
        'jest/no-disabled-tests': 1,
        // Disallow focused tests
        'jest/no-focused-tests': 1,
        // Require test cases and hooks to be inside a describe block
        'jest/require-top-level-describe': 0,
        // Suggest using `expect.assertions()` OR `expect.hasAssertions()`
        'jest/prefer-expect-assertions': 0,
        // Prefer await `expect(...).resolves` over `expect(await ...)` syntax
        'jest/prefer-expect-resolves': 2,

        // Padding Rules (added v28.8)

        // Enforce padding around `afterAll` blocks
        'jest/padding-around-after-all-blocks': 2,
        // Enforce padding around `afterEach` blocks
        'jest/padding-around-after-each-blocks': 2,
        // Enforce padding around `beforeAll` blocks
        'jest/padding-around-before-all-blocks': 2,
        // Enforce padding around `beforeEach` blocks
        'jest/padding-around-before-each-blocks': 2,
        // Enforce padding around `describe` blocks
        'jest/padding-around-describe-blocks': 2,
        // Enforce padding around `test` blocks
        'jest/padding-around-test-blocks': 2,
        // Enforce padding around `expect` groups
        'jest/padding-around-expect-groups': 0,

        // Test Names

        // Enforce valid titles
        'jest/valid-title': [2, {
            ignoreTypeOfDescribeName: true,
        }],
        // Disallow identical titles
        'jest/no-identical-title': 2,
        // Enforce lowercase test names
        'jest/prefer-lowercase-title': [2, {
            ignore: ['describe'],
            allowedPrefixes: [
                'GET',
                'HEAD',
                'POST',
                'PUT',
                'DELETE',
                'PATCH',
                'OPTIONS',
            ],
        }],

        // Hooks

        // Prefer having hooks in a consistent order
        'jest/prefer-hooks-in-order': 2,
        // Suggest having hooks before any test cases
        'jest/prefer-hooks-on-top': 2,
        // Disallow duplicate setup and teardown hooks
        'jest/no-duplicate-hooks': 2,
        // Require setup and teardown code to be within a hook
        'jest/require-hook': 0,
        // Disallow setup and teardown hooks
        'jest/no-hooks': 0,

        // Mocks

        // Disallow manually importing from __mocks__
        'jest/no-mocks-import': 2,
        // Prefer `jest.mocked()` over `fn as jest.Mock` (added v28.6)
        'jest/prefer-jest-mocked': 2,
        // Prefer mock resolved/rejected shorthands for promises
        'jest/prefer-mock-promise-shorthand': 2,
        // Suggest using `jest.spyOn()`
        'jest/prefer-spy-on': 0,

        // Snapshots

        // Disallow string interpolation inside snapshots
        'jest/no-interpolation-in-snapshots': 2,
        // disallow large snapshots
        'jest/no-large-snapshots': 0,
        // Prefer including a hint with external snapshots
        'jest/prefer-snapshot-hint': 2, // keep the 'multi' default option

        // Matchers

        // Disallow alias methods
        'jest/no-alias-methods': 2,
        // Prefer using `toContain()`
        'jest/prefer-to-contain': 2,
        // Prefer using `toHaveLength()`
        'jest/prefer-to-have-length': 2,
        // Disallow specific matchers & modifiers
        'jest/no-restricted-matchers': 0,
        // Prefer using `toStrictEqual()`
        'jest/prefer-strict-equal': 0,
        // Prefer using `toBeCalledWith()` or `toHaveBeenCalledWith()`
        'jest/prefer-called-with': 0,
        // Suggest using the built-in comparison matchers
        'jest/prefer-comparison-matcher': 2,
        // Suggest using the built-in equality matchers
        'jest/prefer-equality-matcher': 2,
        // Require a message for `toThrow()`
        'jest/require-to-throw-message': 0,
        // Suggest using `toBe()` for primitive literals
        'jest/prefer-to-be': 2,

        // Typescript Rules

        // Disallow using jest.mock() factories without an explicit type parameter
        'jest/no-untyped-mock-factory': 0,
        // Enforces unbound methods are called with their expected scope
        'jest/unbound-method': 0, // revisit if @typescript-eslint/unbound-method is enabled
    },
};