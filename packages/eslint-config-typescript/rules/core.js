const tseslint = require('typescript-eslint'),
    sts = require('@stylistic/eslint-plugin-ts');

module.exports = {
    name: 'lcooper/typescript/core',
    languageOptions: {
        parser: tseslint.parser,
    },
    plugins: {
        '@typescript-eslint': tseslint.plugin,
        '@stylistic/ts': sts,
    },
    rules: {
        // typescript plugin rules - best practices

        // require that member overloads be consecutive
        '@typescript-eslint/adjacent-overload-signatures': 2,
        // requires @ts-<directive> comments have a description
        '@typescript-eslint/ban-ts-comment': [2, {
            'ts-expect-error': 'allow-with-description',
            'ts-ignore': 'allow-with-description',
            'ts-nocheck': 'allow-with-description',
            'ts-check': false,
        }],
        // ensures that literals on classes are exposed in a consistent style
        '@typescript-eslint/class-literal-property-style': [2, 'getters'],
        // enforce specifying generic type arguments on the constructor name of a constructor call
        '@typescript-eslint/consistent-generic-constructors': [2, 'constructor'],
        // enforces consistent usage of type assertions
        '@typescript-eslint/consistent-type-assertions': [2, {
            assertionStyle: 'as',
            objectLiteralTypeAssertions: 'allow-as-parameter',
            arrayLiteralTypeAssertions: 'allow-as-parameter', // added v8.20
        }],
        // enforces using a particular method signature syntax.
        '@typescript-eslint/method-signature-style': 2,
        // disallow duplicate enum member values
        '@typescript-eslint/no-duplicate-enum-values': 0,
        // disallow the delete operator with computed key expressions
        '@typescript-eslint/no-dynamic-delete': 2,
        // disallow accidentally using the empty object type `{}` (added v8.0)
        '@typescript-eslint/no-empty-object-type': [2, {
            allowInterfaces: 'with-single-extends',
        }],
        // disallow usage of the `any` type
        '@typescript-eslint/no-explicit-any': 0, // too strict, disabling
        // forbids the use of classes as namespaces
        '@typescript-eslint/no-extraneous-class': [2, {
            allowWithDecorator: true,
        }],
        // disallows explicit type declarations for vars or params initialized to a primitive
        '@typescript-eslint/no-inferrable-types': 2,
        // disallows usage of `void` type outside of generic or return types
        '@typescript-eslint/no-invalid-void-type': 2,
        // disallow the `void` operator except when used to discard a value
        '@typescript-eslint/no-meaningless-void-operator': [2, {
            checkNever: false,
        }],
        // enforce valid definition of `new` and `constructor`
        '@typescript-eslint/no-misused-new': 2,
        // disallow the use of custom TypeScript modules and namespaces
        '@typescript-eslint/no-namespace': 2,
        // disallows using a non-null assertion in the left operand of the nullish coalescing operator
        '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 2,
        // disallow certain types (added v8.0)
        '@typescript-eslint/no-restricted-types': 0,
        // disallow aliasing `this`
        '@typescript-eslint/no-this-alias': [2, {
            allowDestructuring: true,
        }],
        // disallow unnecessary assignment of constructor property parameter (added v7.16)
        '@typescript-eslint/no-unnecessary-parameter-property-assignment': 2,
        // disallows unnecessary constraints on generic types
        '@typescript-eslint/no-unnecessary-type-constraint': 2,
        // disallow using the unsafe built-in Function type (added v8.0)
        '@typescript-eslint/no-unsafe-function-type': 2,
        // disallow empty exports that don't change anything in a module file
        '@typescript-eslint/no-useless-empty-export': 0,
        // disallow using confusing built-in primitive class wrappers (added v8.0)
        '@typescript-eslint/no-wrapper-object-types': 2,
        // require or disallow parameter properties in class constructors
        '@typescript-eslint/parameter-properties': 0,
        // prefer usage of `as const` over literal type
        '@typescript-eslint/prefer-as-const': 2,
        // prefer initializing each enums member value
        '@typescript-eslint/prefer-enum-initializers': 0,
        // use function types instead of interfaces with call signatures
        '@typescript-eslint/prefer-function-type': 2,
        // require that all enum members be literal values to prevent unintended enum member name shadow issues
        '@typescript-eslint/prefer-literal-enum-member': 2,
        // require use of `namespace` over `module` to declare custom TS modules
        '@typescript-eslint/prefer-namespace-keyword': 2,
        // prefer using concise optional chain expressions instead of chained logical ands
        '@typescript-eslint/prefer-optional-chain': 2,
        // sets preference for ES6-style import declarations over triple slash directives
        '@typescript-eslint/triple-slash-reference': [2, {
            path: 'never',
            types: 'never',
            lib: 'never',
        }],
        // disallows awaiting a value that is not a Thenable (requires type info)
        '@typescript-eslint/await-thenable': 2,
        // disallow using the `delete` operator on array values (requires type info) (v6.19.0)
        '@typescript-eslint/no-array-delete': 2,
        // call `.toString()` only on objects that provide useful information when stringified (requires type info)
        '@typescript-eslint/no-base-to-string': 2,
        // requires expressions of type void to appear in statement position (requires type info)
        '@typescript-eslint/no-confusing-void-expression': [2, {
            ignoreArrowShorthand: false,
            ignoreVoidOperator: true,
        }],
        // disallow using code marked as @deprecated (requires type info) (v8.2)
        '@typescript-eslint/no-deprecated': 0,
        // requires Promise-like values to be handled appropriately (requires type info)
        '@typescript-eslint/no-floating-promises': 0,
        // disallow iterating over array indexes with a for-in loop (requires type info)
        '@typescript-eslint/no-for-in-array': 2,
        // avoid using promises in places not designed to handle them (requires type info)
        '@typescript-eslint/no-misused-promises': [2, {
            checksConditionals: true,
            checksVoidReturn: false,
        }],
        // prevents conditionals where the type is always truthy or always falsy (requires type info)
        '@typescript-eslint/no-unnecessary-condition': [2, {
            allowConstantLoopConditions: 'only-allowed-literals', // added v8.24
        }],
        // warns when a namespace qualifier is unnecessary (requires type info)
        '@typescript-eslint/no-unnecessary-qualifier': 2,
        // enforces that type arguments will not be used if not required (requires type info)
        '@typescript-eslint/no-unnecessary-type-arguments': 2,
        // warns if a type assertion does not change the type of an expression (requires type info)
        '@typescript-eslint/no-unnecessary-type-assertion': 2,
        // disallow type parameters that aren't used multiple times (requires type info) (added v8.0)
        '@typescript-eslint/no-unnecessary-type-parameters': 0,
        // disallow type assertions that narrow a type (requires type info) (added v8.15.0)
        '@typescript-eslint/no-unsafe-type-assertion': 0, // too strict
        // require unary negation to take a number (requires type info) (v6.11.0)
        '@typescript-eslint/no-unsafe-unary-minus': 2,
        // disallow unnecessary template literals (renamed from `no-useless-template-literals` in 7.12)
        '@typescript-eslint/no-unnecessary-template-expression': 2,
        // prefers a non-null assertion over explicit type cast when possible (requires type info)
        '@typescript-eslint/non-nullable-type-assertion-style': 2,
        // enforce the use of find() when looking for a single result (requires type info) (v6.21.0)
        '@typescript-eslint/prefer-find': 2,
        // enforce `includes` method over `indexOf` method (requires type info)
        '@typescript-eslint/prefer-includes': 2,
        // enforce the usage of the nullish coalescing operator instead of logical chaining (requires type info)
        '@typescript-eslint/prefer-nullish-coalescing': 0,
        // requires private members be `readonly` if never modified outside the constructor (requires type info)
        '@typescript-eslint/prefer-readonly': 2,
        // prefer using type parameter when calling `Array#reduce` instead of casting (requires type info)
        '@typescript-eslint/prefer-reduce-type-parameter': 2,
        // use `RegExp#exec` over `String#match` if no global flag is provided (requires type info)
        '@typescript-eslint/prefer-regexp-exec': 2,
        // enforce that `this` is used when only `this` type is returned
        '@typescript-eslint/prefer-return-this-type': 2,
        // enforce the use of String's `startsWith` & `endsWith` over equivalent methods (requires type info)
        '@typescript-eslint/prefer-string-starts-ends-with': 2,
        // requires any function or method that returns a Promise to be marked async (requires type info)
        '@typescript-eslint/promise-function-async': 0,
        // enforce that get() & set() types correspond (requires type info) (added v8.15)
        '@typescript-eslint/related-getter-setter-pairs': 2,
        // requires `Array#sort` calls to always provide a `compareFunction` (requires type info)
        '@typescript-eslint/require-array-sort-compare': 0,
        // when adding two variables, operands must both be of type number or of type string (requires type info)
        '@typescript-eslint/restrict-plus-operands': 0, // enabled in `ts` overrides
        // enforce template literal expressions to be of string type (requires type info)
        '@typescript-eslint/restrict-template-expressions': [2, {
            allowNumber: true,
            allowBoolean: true,
            allowAny: true,
            allowNullish: true,
        }],
        // restricts the types allowed in boolean expressions (requires type info)
        '@typescript-eslint/strict-boolean-expressions': 0,
        // disable base `default-case` in favor of `switch-exhaustiveness-check`
        'default-case': 0,
        // exhaustiveness checking in switch with union type (requires type info)
        '@typescript-eslint/switch-exhaustiveness-check': [2, {
            considerDefaultExhaustiveForUnions: true, // added v8.12
            requireDefaultForNonUnion: true,
            defaultCaseCommentPattern: '^no default', // added v8.18
        }],
        // enforces unbound methods are called with their expected scope (requires type info)
        '@typescript-eslint/unbound-method': 0,

        // typescript plugin rules - stylistic issues

        // requires using either `T[]` or `Array<T>` for arrays
        '@typescript-eslint/array-type': [2, {
            default: 'array',
        }],
        // bans // tslint:<rule-flag> comments from being used
        '@typescript-eslint/ban-tslint-comment': 2,
        // enforce the use of the record type
        '@typescript-eslint/consistent-indexed-object-style': [2, 'record'],
        // enforce use of `interface` over `type`
        '@typescript-eslint/consistent-type-definitions': [2, 'interface'],
        // enforces consistent usage of type exports (requires type info)
        '@typescript-eslint/consistent-type-exports': [2, {
            fixMixedExportsWithInlineTypeSpecifier: true,
        }],
        // enforces consistent usage of type imports
        '@typescript-eslint/consistent-type-imports': 0,
        // require a specific member delimiter style for interfaces and type literals
        '@stylistic/ts/member-delimiter-style': [2, {
            multiline: {
                delimiter: 'none', // none, semi, comma
                // requireLast: true,
            },
            singleline: {
                delimiter: 'comma', // semi, comma
                requireLast: false,
            },
            multilineDetection: 'brackets', // brackets | last-member
        }],
        // require a consistent member declaration order
        '@typescript-eslint/member-ordering': [2, {
            default: [
                // index signature
                'signature',
                // fields
                'static-field',
                'field',
                // constructors
                'constructor',
                // methods
                'static-method',
                'method',
            ],
        }],
        // disallow non-null assertion in locations that may be confusing
        '@typescript-eslint/no-confusing-non-null-assertion': 2,
        // disallow extra non-null assertion
        '@typescript-eslint/no-extra-non-null-assertion': 2,
        // disallows non-null assertions using the `!` postfix operator
        '@typescript-eslint/no-non-null-assertion': 0,
        // disallow members of unions and intersections that do nothing or override type info (requires type info)
        '@typescript-eslint/no-redundant-type-constituents': 2,
        // disallow the use of type aliases
        '@typescript-eslint/no-type-alias': [0, {
            allowAliases: 'in-unions-and-intersections',
            allowCallbacks: 'always',
            allowConditionalTypes: 'always',
            allowConstructors: 'always',
            allowLiterals: 'always',
            allowMappedTypes: 'always',
            allowTupleTypes: 'always',
        }],
        // prefer a ‘for-of’ loop wherever possible
        '@typescript-eslint/prefer-for-of': 0,
        // require consistent spacing around type annotations
        '@stylistic/ts/type-annotation-spacing': 2,
        // requires type annotations to exist
        '@typescript-eslint/typedef': 0,
        // flags unnecessary equality comparisons against boolean literals (requires type info)
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': 2,

        // typescript plugin rules - variables

        // warns if any two overloads could be unified into one
        '@typescript-eslint/unified-signatures': [2, {
            ignoreOverloadsWithDifferentJSDoc: true, // added v8.26
        }],
        // enforces naming conventions for everything across a codebase (requires type info)
        '@typescript-eslint/naming-convention': 0,

        // typescript plugin rules - possible errors

        // disallows using a non-null assertion after an optional chain expression
        '@typescript-eslint/no-non-null-asserted-optional-chain': 2,
        // disallow using the spread operator when it might cause unexpected behavior (requires type info) (added v8.20)
        '@typescript-eslint/no-misused-spread': [2, {
            allow: [{ from: 'lib', name: 'string' }], // allow spread syntax on strings
        }],
        // disallow unsafe declaration merging
        '@typescript-eslint/no-unsafe-declaration-merging': 2,
        // disallows calling an function with an any type value (requires type info)
        '@typescript-eslint/no-unsafe-argument': 0, // enable when errors are more strongly typed
        // disallows assigning any to variables and properties (requires type info)
        '@typescript-eslint/no-unsafe-assignment': 0, // enabled in `ts` overrides
        // disallows calling an any type value (requires type info)
        '@typescript-eslint/no-unsafe-call': 0, // enabled in `ts` overrides
        // disallows member access on any typed variables (requires type info)
        '@typescript-eslint/no-unsafe-member-access': 0, // enabled in `ts` overrides
        // disallows returning any from a function (requires type info)
        '@typescript-eslint/no-unsafe-return': 0, // enabled in `ts` overrides
        // requires that function parameters be typed as readonly (requires type info)
        '@typescript-eslint/prefer-readonly-parameter-types': 0,
    },
};