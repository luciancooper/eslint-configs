const { rules: coreRules } = require('@lcooper/eslint-config/rules/core');

module.exports = {
    rules: {
        // eslint base rules

        // plugin:@typescript-eslint/eslint-recommended overwrites this rule, so it must be re-overwritten
        'prefer-const': coreRules['prefer-const'],
        // disabling this rule because typescript handles it
        'consistent-return': 0,

        // typescript plugin rules - best practices

        // disallows invocation of `require()`
        '@typescript-eslint/no-require-imports': 2,
        // disallows the use of require statements except in import statements
        '@typescript-eslint/no-var-requires': 2,
        // enforce the usage of the nullish coalescing operator instead of logical chaining (requires type info)
        '@typescript-eslint/prefer-nullish-coalescing': 2,
        // when adding two variables, operands must both be of type number or of type string (requires type info)
        '@typescript-eslint/restrict-plus-operands': [2, {
            checkCompoundAssignments: true,
        }],

        // typescript plugin rules - stylistic issues

        // require explicit return types on functions and class methods
        '@typescript-eslint/explicit-function-return-type': 0,
        // require explicit accessibility modifiers on class properties and methods
        '@typescript-eslint/explicit-member-accessibility': 0,
        // require explicit return and argument types on exported functions' and classes' public class methods
        '@typescript-eslint/explicit-module-boundary-types': 0,

        // typescript plugin rules - possible errors

        // disallows assigning any to variables and properties (requires type info)
        '@typescript-eslint/no-unsafe-assignment': 2,
        // disallows calling an any type value (requires type info)
        '@typescript-eslint/no-unsafe-call': 2,
        // disallows member access on any typed variables (requires type info)
        '@typescript-eslint/no-unsafe-member-access': 2,
        // disallows returning any from a function (requires type info)
        '@typescript-eslint/no-unsafe-return': 2,

        // typescript plugin extension rules - best practices

        // enforce default parameters to be last
        'default-param-last': 0,
        '@typescript-eslint/default-param-last': 2,
        // disallow duplicate imports ()
        '@typescript-eslint/no-duplicate-imports': 0, // this is handled by `import/no-duplicates`
        // disallow empty functions
        'no-empty-function': 0,
        '@typescript-eslint/no-empty-function': [2, {
            allow: [
                'functions',
                'arrowFunctions',
                'methods',
                'private-constructors',
                'protected-constructors',
            ],
        }],
        // disallow `this` keywords outside of classes or class-like objects
        '@typescript-eslint/no-invalid-this': 0,
        // disallow function declarations that contain unsafe references inside loop statements
        '@typescript-eslint/no-loop-func': 0,
        // disallow magic numbers
        '@typescript-eslint/no-magic-numbers': 0,
        // disallow variable redeclaration
        'no-redeclare': 0,
        '@typescript-eslint/no-redeclare': 2,
        // disallow specified modules when loaded by `import`
        '@typescript-eslint/no-restricted-imports': 0,
        // disallow unused expressions
        'no-unused-expressions': 0,
        '@typescript-eslint/no-unused-expressions': 2,
        // disallow unnecessary constructors
        'no-useless-constructor': 0,
        '@typescript-eslint/no-useless-constructor': 2,
        // enforce dot notation whenever possible (requires type info)
        'dot-notation': 0,
        '@typescript-eslint/dot-notation': [2, {
            allowKeywords: true,
            allowPrivateClassPropertyAccess: false,
            allowProtectedClassPropertyAccess: false,
            allowIndexSignaturePropertyAccess: false,
        }],
        // disallow the use of `eval()`-like methods (requires type info)
        'no-implied-eval': 0,
        '@typescript-eslint/no-implied-eval': 2,
        // disallow throwing literals as exceptions (requires type info)
        'no-throw-literal': 0,
        '@typescript-eslint/no-throw-literal': 2,
        // disallow async functions which have no `await` expression (requires type info)
        '@typescript-eslint/require-await': 0,
        // enforces consistent returning of awaited values (requires type info)
        'no-return-await': 0,
        '@typescript-eslint/return-await': 2,

        // typescript plugin extension rules - stylistic issues

        // enforce consistent brace style for blocks
        'brace-style': 0,
        '@typescript-eslint/brace-style': [2, '1tbs', { allowSingleLine: true }],
        // require trailing commas
        'comma-dangle': 0,
        '@typescript-eslint/comma-dangle': [2, 'always-multiline'],
        // enforces consistent spacing before and after commas
        'comma-spacing': 0,
        '@typescript-eslint/comma-spacing': [2, { before: false, after: true }],
        // disallow spacing between function identifiers and their invocations
        'func-call-spacing': 0,
        '@typescript-eslint/func-call-spacing': 2,
        // enforce consistent indentation
        indent: 0,
        '@typescript-eslint/indent': [2, 4, {
            SwitchCase: 1,
        }],
        // enforce consistent spacing before and after keywords
        'keyword-spacing': 0,
        '@typescript-eslint/keyword-spacing': 2, // different from airbnb-base, but functionally identical
        // require or disallow an empty line between class members
        'lines-between-class-members': 0,
        '@typescript-eslint/lines-between-class-members': [2, 'always'],
        // disallow generic `Array` constructors
        'no-array-constructor': 0,
        '@typescript-eslint/no-array-constructor': 2,
        // enforce consistent spacing inside braces
        'object-curly-spacing': 0,
        '@typescript-eslint/object-curly-spacing': [2, 'always'],
        // require or disallow padding lines between statements
        '@typescript-eslint/padding-line-between-statements': 0,
        // enforce the consistent use of either backticks, double, or single quotes
        quotes: 0,
        '@typescript-eslint/quotes': [2, 'single', {
            avoidEscape: true,
        }],
        // require or disallow semicolons instead of ASI
        semi: 0,
        '@typescript-eslint/semi': 2,
        // enforces consistent spacing before function parenthesis
        'space-before-function-paren': 0,
        '@typescript-eslint/space-before-function-paren': [2, {
            anonymous: 'always',
            named: 'never',
            asyncArrow: 'always',
        }],
        // this rule is aimed at ensuring there are spaces around infix operators.
        'space-infix-ops': 0,
        '@typescript-eslint/space-infix-ops': 2,

        // typescript plugin extension rules - variables

        // require or disallow initialization in variable declarations
        '@typescript-eslint/init-declarations': 0,
        // disallow variable declarations from shadowing variables declared in the outer scope
        'no-shadow': 0,
        '@typescript-eslint/no-shadow': [2, {
            ignoreTypeValueShadow: false,
            ignoreFunctionTypeParameterNameValueShadow: false,
        }],
        // disallow unused variables
        'no-unused-vars': 0,
        '@typescript-eslint/no-unused-vars': [2, {
            vars: 'local',
            args: 'none',
        }],
        // disallow the use of variables before they are defined
        'no-use-before-define': 0,
        '@typescript-eslint/no-use-before-define': [2, {
            functions: true,
            classes: true,
            variables: true,
            enums: true,
            typedefs: true,
            ignoreTypeReferences: true,
        }],

        // typescript plugin extension rules - possible errors

        // disallow duplicate class members
        'no-dupe-class-members': 0,
        '@typescript-eslint/no-dupe-class-members': 2,
        // disallow unnecessary parentheses
        '@typescript-eslint/no-extra-parens': 0,
        // disallow unnecessary semicolons
        'no-extra-semi': 0,
        '@typescript-eslint/no-extra-semi': 2,
        // disallow literal numbers that lose precision (req eslint v7.1)
        'no-loss-of-precision': 0,
        '@typescript-eslint/no-loss-of-precision': 2,
    },
};