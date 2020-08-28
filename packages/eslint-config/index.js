module.exports = {
    extends: [
        'airbnb-base',
    ],
    env: {
        es6: true,
        node: true,
    },
    plugins: [
        'jsdoc',
    ],
    overrides: [
        {
            files: [
                '**/__tests__/*.[jt]s?(x)',
                '**/+(*.)@(spec|test).[jt]s?(x)',
            ],
            env: {
                jest: true,
            },
        },
    ],
    settings: {
        jsdoc: {
            tagNamePreference: {
                // [@abstract] / @virtual
                virtual: 'abstract',
                // @augments / [@extends]
                augments: 'extends',
                // [@class] / @constructor
                'tag constructor': 'class',
                // [@constant] / @const
                const: 'constant',
                // [@default] / @defaultvalue
                defaultvalue: 'default',
                // [@description] / @desc
                desc: 'description',
                // [@external] / @host
                host: 'external',
                // [@file] / @fileoverview / @overview
                fileoverview: 'file',
                overview: 'file',
                // [@fires] / @emits
                emits: 'fires',
                // [@function] / @func / @method
                func: 'function',
                method: 'function',
                // [@member] / @var
                var: 'member',
                // [@param] / @arg / @argument
                arg: 'param',
                argument: 'param',
                // [@property] / @prop
                prop: 'property',
                // [@returns] / @return
                return: 'returns',
                // @exception / [@throws]
                exception: 'throws',
                // [@yeilds] / @yields
                yield: 'yields',
            },
            overrideReplacesDocs: true,
            augmentsExtendsReplacesDocs: true,
            implementsReplacesDocs: true,
            preferredTypes: {
                Boolean: 'boolean',
                Number: 'number',
                String: 'string',
                Null: 'null',
                Undefined: 'undefined',
                Void: 'void',
                any: '*',
                array: '[]',
                Array: '[]',
                '.<>': '<>',
                object: 'Object',
                regexp: 'RegExp',
                function: 'Function',
                set: 'Set',
                date: 'Date',
                error: 'Error',
            },
        },
    },
    rules: {
        indent: ['error', 4, {
            SwitchCase: 1,
        }],
        'eol-last': ['error', 'never'],
        'one-var': ['error', 'consecutive'],
        'no-console': 'off',
        'no-unused-vars': ['error', {
            vars: 'local',
            args: 'none',
        }],
        'no-underscore-dangle': 'off',
        'no-nested-ternary': 'off',
        'no-bitwise': 'off',
        'class-methods-use-this': 'off',
        camelcase: 'off',
        'no-continue': 'off',
        'prefer-destructuring': [
            'error',
            {
                VariableDeclarator: { array: false, object: true },
                AssignmentExpression: { array: false, object: false },
            },
            { enforceForRenamedProperties: false },
        ],
        'max-len': ['error', 120, 4, {
            ignoreUrls: true,
            ignoreComments: false,
            ignoreRegExpLiterals: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
        }],
        'no-await-in-loop': 'off',
        'consistent-return': ['error', {
            treatUndefinedAsUnspecified: true,
        }],
        'no-void': 'off',

        // eslint-plugin-jsdoc rules

        // Checks for presence of jsdoc comments, on class declarations as well as functions
        'jsdoc/require-jsdoc': 0,
        // Ensure all files begin with a @fileoverview tag
        'jsdoc/require-file-overview': [1, {
            tags: {
                file: {
                    initialCommentsOnly: true,
                    mustExist: false,
                    preventDuplicates: true,
                },
            },
        }],
        // Reports against Google Closure Compiler syntax
        'jsdoc/check-syntax': 2,
        // Checks for multi-line-style comments that look like jsdoc comments but don't begin with asterisks
        'jsdoc/no-bad-blocks': 1,
        // Reports invalid alignment of block asterisks
        'jsdoc/check-alignment': 2,
        // Reports invalid padding inside a block
        'jsdoc/check-indentation': 2,
        // Enforces a consistent padding of the block description
        'jsdoc/newline-after-description': [2, 'never'],
        // Reports invalid tag names
        'jsdoc/check-tag-names': 1,
        // Checks that @access tag values are one of 'package', 'private', 'protected', or 'public'
        'jsdoc/check-access': 2,
        // Requires certain tags to be empty
        'jsdoc/empty-tags': 2,
        // Checks the values for the @version, @since, @license, & @author values
        'jsdoc/check-values': 2,
        // Non-constructor functions cannot use @implements
        'jsdoc/implements-on-classes': 1,
        // requires all types to be valid JSDoc or Closure compiler types without syntax errors.
        'jsdoc/valid-types': [2, {
            allowEmptyNamepaths: true,
        }],
        // Checks that types are defined. This can be used to check unimported types.
        'jsdoc/no-undefined-types': 0,
        // Reports invalid types
        'jsdoc/check-types': [2, {
            unifyParentAndChildTypeChecks: true,
        }],
        // This rule forbids types on @param & @returns tags
        'jsdoc/no-types': 0,
        // @example - requires all functions to have examples
        'jsdoc/require-example': 0,
        // @example - ensures that js examples adhere to ESLint rules
        'jsdoc/check-examples': [2, {
            captionRequired: false,
            // ignore exampleCodeRegex & rejectExampleCodeRegex
            paddedIndent: 2,
            allowInlineConfig: true,
            noDefaultExampleRules: true,
            // configFile
            // matchingFileName
            checkEslintrc: true,
            // baseConfig
        }],
        // @description - requires all functions to have a description
        'jsdoc/require-description': 0,
        // @description - requires that block & tag descriptions are written in complete sentences
        'jsdoc/require-description-complete-sentence': 0,
        // @description - enforces a regexp on description values
        'jsdoc/match-description': 0,
        // @param - requires all function params to be documented
        'jsdoc/require-param': 0,
        // @param - do not allow default values
        'jsdoc/no-defaults': 0,
        // @param - Ensures that parameter names match those in the function declaration.
        'jsdoc/check-param-names': [2, {
            allowExtraTrailingParamDocs: false,
            checkDestructured: true,
        }],
        // @param - Requires that all function parameters have name
        'jsdoc/require-param-name': 2,
        // @param - Requires that @param tag has type value
        'jsdoc/require-param-type': 2,
        // @param - Requires that @param tag has description value
        'jsdoc/require-param-description': 0,
        // @param - Requires a hyphen before the @param description
        'jsdoc/require-hyphen-before-param-description': [2, 'always', {
            tags: {
                returns: 'always',
                property: 'always',
            },
        }],
        // @returns - Requires a return statement in function body if a @returns tag is specified.
        'jsdoc/require-returns-check': 1,
        // @returns - Requires that @returns tag has type value
        'jsdoc/require-returns-type': 2,
        // @returns - requires that @returns tags have description values
        'jsdoc/require-returns-description': 0,
        // @returns - requires that returns are documented
        'jsdoc/require-returns': 0,
        // @throws - requires that throw statements are documented.
        'jsdoc/require-throws': 0,
        // @property - all @typedef & @namespace tags of type {object} must have a @property
        'jsdoc/require-property': 0,
        // @property - no duplicate property names in the same block & nested properties have defined roots.
        'jsdoc/check-property-names': 2,
        // @property - each @property tag have a type value.
        'jsdoc/require-property-type': 2,
        // @property - each @property tag have a name.
        'jsdoc/require-property-name': 2,
        // @property - each @property tag have a description.
        'jsdoc/require-property-description': 0,
    },
};