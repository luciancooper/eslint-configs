module.exports = {
    env: {
        'jest/globals': true,
    },
    plugins: [
        'jest',
    ],
    rules: {
        // Have control over `test` and `it` usages
        'jest/consistent-test-it': [2, {
            fn: 'test',
            withinDescribe: 'test',
        }],
        // Enforce assertion to be made in a test body
        'jest/expect-expect': 2,
        // Enforces a maximum depth to nested describe calls
        'jest/max-nested-describe': 0,
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
        // Avoid using a callback in asynchronous tests and hooks
        'jest/no-done-callback': 2,
        // Enforce having return statement when testing with promises
        'jest/valid-expect-in-promise': 2,
        // Disallow explicitly returning from tests
        'jest/no-test-return-statement': 2,
        // Disallow Jasmine globals
        'jest/no-jasmine-globals': 2,
        // Disallow importing Jest
        'jest/no-jest-import': 2,
        // Disallow using exports in files containing tests
        'jest/no-export': 2,
        // Suggest using `test.todo`
        'jest/prefer-todo': 2,
        // Use `.only` and `.skip` over f and x
        'jest/no-test-prefixes': 2,
        // Disallow commented out tests
        'jest/no-commented-out-tests': 1,
        // Disallow disabled tests
        'jest/no-disabled-tests': 1,
        // Disallow focused tests
        'jest/no-focused-tests': 1,
        // Disallow conditional logic
        'jest/no-if': 0,
        // Require test cases and hooks to be inside a describe block
        'jest/require-top-level-describe': 0,
        // Suggest using `expect.assertions()` OR `expect.hasAssertions()`
        'jest/prefer-expect-assertions': 0,
        // Prefer await `expect(...).resolves` over `expect(await ...)` syntax
        'jest/prefer-expect-resolves': 2,

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
        // Suggest using `jest.spyOn()`
        'jest/prefer-spy-on': 0,

        // Snapshots

        // Disallow string interpolation inside snapshots
        'jest/no-interpolation-in-snapshots': 2,
        // disallow large snapshots
        'jest/no-large-snapshots': 0,

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
        // Require a message for `toThrow()`
        'jest/require-to-throw-message': 0,
        // Suggest using `toBe()` for primitive literals
        'jest/prefer-to-be': 2,

        // Typescript Rules

        // Enforces unbound methods are called with their expected scope
        'jest/unbound-method': 0, // revisit if @typescript-eslint/unbound-method is enabled
    },
};