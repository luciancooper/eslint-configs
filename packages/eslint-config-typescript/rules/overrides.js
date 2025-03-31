const tsdoc = require('eslint-plugin-tsdoc'),
    { rules: coreRules } = require('@lcooper/eslint-config/rules/core');

module.exports = {
    files: ['**/*.{ts,tsx,mts,cts}'],
    plugins: {
        tsdoc,
    },
    languageOptions: {
        sourceType: 'module',
    },
    rules: {
        // eslint base rules

        // plugin:@typescript-eslint/eslint-recommended overwrites this rule, so it must be re-overwritten
        'prefer-const': coreRules['prefer-const'],

        // typescript plugin rules - best practices

        // disallow duplicate constituents of union or intersection types (requires type info) (v5.57.0)
        '@typescript-eslint/no-duplicate-type-constituents': 2,
        // enforce the use of top-level import type qualifier when an import only has inline type qualifiers (v5.51.0)
        '@typescript-eslint/no-import-type-side-effects': 2,
        // disallow enums from having both number and string members (requires type info) (v5.53.0)
        '@typescript-eslint/no-mixed-enums': 2,
        // disallows invocation of `require()`
        '@typescript-eslint/no-require-imports': [2, {
            allowAsImport: true, // added v8.0
        }],
        // disallow comparing an enum value with a non-enum value (requires type info) (v5.58.0)
        '@typescript-eslint/no-unsafe-enum-comparison': 2,
        // when adding two variables, operands must both be of type number or of type string (requires type info)
        '@typescript-eslint/restrict-plus-operands': [2, {
            skipCompoundAssignments: false,
        }],
        // enforce typing arguments in `.catch()` callbacks as `unknown` (requires type info) (v7.3.0)
        '@typescript-eslint/use-unknown-in-catch-callback-variable': 0,

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

        // enforce that class methods utilize `this` (v6.2.0)
        '@typescript-eslint/class-methods-use-this': 0,
        // disabling this rule because typescript handles it
        'consistent-return': 0,
        // require `return` statements to either always or never specify values (requires type info) (v7.1.0)
        '@typescript-eslint/consistent-return': 0,
        // enforce default parameters to be last
        'default-param-last': 0,
        '@typescript-eslint/default-param-last': 2,
        // enforce a maximum number of parameters in function definitions
        '@typescript-eslint/max-params': 0,
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
        '@typescript-eslint/only-throw-error': 2, // renamed from `no-throw-literal` in v7.4
        // require using Error objects as Promise rejection reasons (requires type info) (v6.19.0)
        'prefer-promise-reject-errors': 0,
        '@typescript-eslint/prefer-promise-reject-errors': [2, {
            allowEmptyReject: true,
            allowThrowingAny: true, // added v8.17
            allowThrowingUnknown: true, // added v8.17
        }],
        // disallow async functions which have no `await` expression (requires type info)
        '@typescript-eslint/require-await': 0,
        // enforces consistent returning of awaited values (requires type info)
        'no-return-await': 0,
        '@typescript-eslint/return-await': 2,

        // typescript plugin extension rules - stylistic issues

        // disallow or enforce spaces inside of blocks after opening block and before closing block
        '@stylistic/js/block-spacing': 0,
        '@stylistic/ts/block-spacing': 2,
        // enforce consistent brace style for blocks
        '@stylistic/js/brace-style': 0,
        '@stylistic/ts/brace-style': [2, '1tbs', { allowSingleLine: true }],
        // require trailing commas
        '@stylistic/js/comma-dangle': 0,
        '@stylistic/ts/comma-dangle': [2, 'always-multiline'],
        // enforces consistent spacing before and after commas
        '@stylistic/js/comma-spacing': 0,
        '@stylistic/ts/comma-spacing': [2, { before: false, after: true }],
        // disallow spacing between function identifiers and their invocations
        '@stylistic/js/func-call-spacing': 0,
        '@stylistic/ts/func-call-spacing': 2,
        // enforce consistent indentation
        '@stylistic/js/indent': 0,
        '@stylistic/ts/indent': [2, 4, {
            SwitchCase: 1,
        }],
        // enforce consistent spacing between property names and type annotations in types and interfaces
        '@stylistic/js/key-spacing': 0,
        '@stylistic/ts/key-spacing': [2, { beforeColon: false, afterColon: true }],
        // enforce consistent spacing before and after keywords
        '@stylistic/js/keyword-spacing': 0,
        '@stylistic/ts/keyword-spacing': 2, // different from airbnb-base, but functionally identical
        // require empty lines around comments
        '@stylistic/js/lines-around-comment': 0,
        '@stylistic/ts/lines-around-comment': 0,
        // require or disallow an empty line between class members
        '@stylistic/js/lines-between-class-members': 0,
        '@stylistic/ts/lines-between-class-members': [2, 'always'],
        // disallow generic `Array` constructors
        'no-array-constructor': 0,
        '@typescript-eslint/no-array-constructor': 2,
        // enforce consistent line breaks after opening and before closing braces
        '@stylistic/js/object-curly-newline': 0,
        '@stylistic/ts/object-curly-newline': (() => {
            // modifiy airbnb's base config to allow for 6 properties in a line for import / export statements
            const [level, options] = coreRules['@stylistic/js/object-curly-newline'];
            return [level, {
                ...options,
                TSInterfaceBody: { minProperties: 4, multiline: true, consistent: true },
                TSTypeLiteral: { minProperties: 4, multiline: true, consistent: true },
            }];
        })(),
        // enforce consistent spacing inside braces
        '@stylistic/js/object-curly-spacing': 0,
        '@stylistic/ts/object-curly-spacing': [2, 'always'],
        // enforce same line or multiple lines on object properties
        '@stylistic/js/object-property-newline': 0,
        '@stylistic/ts/object-property-newline': [2, { allowAllPropertiesOnSameLine: true }],
        // require or disallow padding lines between statements
        '@stylistic/js/padding-line-between-statements': 0,
        '@stylistic/ts/padding-line-between-statements': 0,
        // require quotes around object literal, type literal, interfaces and enums property names
        '@stylistic/js/quote-props': 0,
        '@stylistic/ts/quote-props': [2, 'as-needed', { keywords: false, unnecessary: true, numbers: false }],

        // enforce the consistent use of either backticks, double, or single quotes
        '@stylistic/js/quotes': 0,
        '@stylistic/ts/quotes': [2, 'single', { avoidEscape: true }],
        // require or disallow semicolons instead of ASI
        '@stylistic/js/semi': 0,
        '@stylistic/ts/semi': 2,
        // enforce consistent spacing before blocks
        '@stylistic/js/space-before-blocks': 0,
        '@stylistic/ts/space-before-blocks': 2,
        // enforces consistent spacing before function parenthesis
        '@stylistic/js/space-before-function-paren': 0,
        '@stylistic/ts/space-before-function-paren': [2, {
            anonymous: 'always',
            named: 'never',
            asyncArrow: 'always',
        }],
        // this rule is aimed at ensuring there are spaces around infix operators.
        '@stylistic/js/space-infix-ops': 0,
        '@stylistic/ts/space-infix-ops': 2,

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
        '@typescript-eslint/no-unused-vars': coreRules['no-unused-vars'],
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
        // require destructuring from arrays and/or objects (requires type info) (v6.8.0)
        'prefer-destructuring': 0,
        '@typescript-eslint/prefer-destructuring': [2, {
            VariableDeclarator: { array: false, object: true },
            AssignmentExpression: { array: false, object: false },
        }, {
            enforceForRenamedProperties: false,
            enforceForDeclarationWithTypeAnnotation: false,
        }],

        // typescript plugin extension rules - possible errors

        // disallow duplicate class members
        'no-dupe-class-members': 0,
        '@typescript-eslint/no-dupe-class-members': 2,
        // disallow unnecessary parentheses
        '@stylistic/js/no-extra-parens': 0,
        '@stylistic/ts/no-extra-parens': 0,
        // disallow unnecessary semicolons
        '@stylistic/js/no-extra-semi': 0,
        '@stylistic/ts/no-extra-semi': 2,

        // tsdoc plugin rules
        'tsdoc/syntax': 2,
    },
};