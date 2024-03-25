const react = require('eslint-plugin-react'),
    hooks = require('eslint-plugin-react-hooks'),
    globals = require('globals');

const hasAutomaticRuntime = (() => {
    try {
        require.resolve('react/jsx-runtime');
        return true;
    } catch (e) {
        return false;
    }
})();

module.exports = {
    files: ['**/*.{js,mjs,jsx}'],
    plugins: {
        react,
        'react-hooks': hooks,
    },
    languageOptions: {
        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },
        },
        globals: {
            ...globals.browser,
        },
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        // enforce consistent use of  single quotes in JSX attributes
        'jsx-quotes': [2, 'prefer-single'],

        // eslint-plugin-react rules

        // Enforces consistent naming for boolean props
        'react/boolean-prop-naming': 0,
        // Forbid "button" element without an explicit "type" attribute
        'react/button-has-type': 2,
        // Enforce using onChange or readonly attribute when checked is used (v7.34.0)
        'react/checked-requires-onchange-or-readonly': 0,
        // Enforce all defaultProps are defined and not "required" in propTypes.
        'react/default-props-match-prop-types': 0,
        // Enforce consistent usage of destructuring assignment of props, state, and context
        'react/destructuring-assignment': [2, 'always', {
            ignoreClassFields: true,
        }],
        // Prevent missing displayName in a React component definition
        'react/display-name': 0,
        // Forbid certain props on components
        'react/forbid-component-props': 0,
        // Forbid certain props on DOM Nodes
        'react/forbid-dom-props': 0,
        // Forbid certain elements
        'react/forbid-elements': 0,
        // Forbid using another component's propTypes
        'react/forbid-foreign-prop-types': 0,
        // Forbid certain propTypes
        'react/forbid-prop-types': 0,
        // Standardize the way function component get defined 🔧
        'react/function-component-definition': [2, {
            namedComponents: ['function-declaration', 'arrow-function'],
            unnamedComponents: 'arrow-function',
        }],
        // Ensure destructuring and symmetric naming of useState hook value and setter variables (v7.29.0)
        'react/hook-use-state': 0,
        // Enforce sandbox attribute on iframe elements (v7.29.0)
        'react/iframe-missing-sandbox': 0,
        // Reports when this.state is accessed within setState
        'react/no-access-state-in-setstate': 2,
        // Prevent adjacent inline elements not separated by whitespace.
        'react/no-adjacent-inline-elements': 0,
        // Prevent usage of Array index in keys
        'react/no-array-index-key': 0,
        // Lifecycle methods should be methods on the prototype, not class fields (v7.27.0)
        'react/no-arrow-function-lifecycle': 2,
        // Prevent passing of children as props.
        'react/no-children-prop': 2,
        // Prevent usage of dangerous JSX props
        'react/no-danger': 0,
        // Report when a DOM element is using both children and dangerouslySetInnerHTML
        'react/no-danger-with-children': 2,
        // Prevent usage of deprecated methods
        'react/no-deprecated': 2,
        // Prevent usage of setState in componentDidMount
        'react/no-did-mount-set-state': 0,
        // Prevent usage of setState in componentDidUpdate
        'react/no-did-update-set-state': 2,
        // Prevent direct mutation of this.state
        'react/no-direct-mutation-state': 2,
        // Prevent usage of findDOMNode
        'react/no-find-dom-node': 2,
        // checks the "rel" value to make sure it is correct (v7.27.0)
        'react/no-invalid-html-attribute': 2,
        // Prevent usage of isMounted
        'react/no-is-mounted': 2,
        // Prevent multiple component definition per file
        'react/no-multi-comp': 0,
        // Pnforces the absence of a namespace in React elements (v7.26.0)
        'react/no-namespace': 2,
        // Disallow usage of referential-type variables as default param in functional component (v7.32.0)
        'react/no-object-type-as-default-prop': 1,
        // Flag shouldComponentUpdate when extending PureComponent
        'react/no-redundant-should-component-update': 2,
        // Prevent usage of the return value of React.render
        'react/no-render-return-value': 2,
        // Prevent usage of setState
        'react/no-set-state': 0,
        // Prevent string definitions for references and prevent referencing this.refs
        'react/no-string-refs': [2, {
            noTemplateLiterals: true,
        }],
        // Report "this" being used in stateless components
        'react/no-this-in-sfc': 2,
        // Prevent common typos
        'react/no-typos': 2,
        // Detect unescaped HTML entities, which might represent malformed tags
        'react/no-unescaped-entities': 2,
        // Prevent usage of unknown DOM property 🔧
        'react/no-unknown-property': [2, { requireDataLowercase: true }],
        // Prevent usage of unsafe lifecycle methods
        'react/no-unsafe': 0,
        // Prevent creating unstable components inside components (v7.23.0)
        'react/no-unstable-nested-components': [2, {
            allowAsProps: true,
        }],
        // Warns you if you have defined a method or property but it is never being used anywhere (v7.27.0)
        'react/no-unused-class-component-methods': 1,
        // Prevent definitions of unused prop types
        'react/no-unused-prop-types': 1,
        // Prevent definition of unused state fields
        'react/no-unused-state': 2,
        // Prevent usage of setState in componentWillUpdate
        'react/no-will-update-set-state': 2,
        // Enforce ES5 or ES6 class for React Components
        'react/prefer-es6-class': [2, 'always'],
        // ensure only exact prop definitions are used when writing components (v7.25.0)
        'react/prefer-exact-props': 0,
        // Require read-only props. 🔧
        'react/prefer-read-only-props': 0,
        // Enforce stateless components to be written as a pure function
        'react/prefer-stateless-function': [2, {
            ignorePureComponents: true,
        }],
        // Prevent missing props validation in a React component definition
        'react/prop-types': [2, {
            skipUndeclared: true,
        }],
        // Prevent missing React when using JSX
        'react/react-in-jsx-scope': hasAutomaticRuntime ? 0 : 2,
        // Enforce a defaultProps definition for every prop that is not a required prop.
        'react/require-default-props': [2, {
            forbidDefaultForRequired: true,
        }],
        // Enforce React components to have a shouldComponentUpdate method
        'react/require-optimization': 0,
        // Enforce ES5 or ES6 class for returning value in render function
        'react/require-render-return': 2,
        // Prevent extra closing tags for components without children 🔧
        'react/self-closing-comp': [2, {
            component: true,
            html: true,
        }],
        // Enforce component methods order
        'react/sort-comp': [1, {
            order: [
                'static-variables',
                'static-methods',
                'lifecycle',
                '/^on.+$/',
                'everything-else',
                '/^render.+$/',
                'render',
            ],
        }],
        // Enforce defaultProps declarations alphabetical sorting (v7.32.0)
        'react/sort-default-props': 0,
        // Enforce propTypes declarations alphabetical sorting
        'react/sort-prop-types': [1, {
            callbacksLast: true,
            ignoreCase: true,
            requiredFirst: true,
            sortShapeProp: false,
            noSortAlphabetically: true,
        }],
        // State initialization in an ES6 class component should be in a constructor
        'react/state-in-constructor': [2, 'always'],
        // Defines where React component static properties should be positioned.
        'react/static-property-placement': [2, 'property assignment'],
        // Enforce style prop value is an object
        'react/style-prop-object': 2,
        // Prevent passing of children to void DOM elements (e.g. <br />).
        'react/void-dom-elements-no-children': 2,

        // JSX-specific rules

        // Enforce boolean attributes notation in JSX 🔧
        'react/jsx-boolean-value': [2, 'never'],
        // Ensures inline tags are not rendered without spaces between them
        'react/jsx-child-element-spacing': 0,
        // Validate closing bracket location in JSX 🔧
        'react/jsx-closing-bracket-location': [2, {
            nonEmpty: 'line-aligned',
            selfClosing: 'line-aligned',
        }],
        // Validate closing tag location for multiline JSX 🔧
        'react/jsx-closing-tag-location': 2,
        // Disallow unnecessary JSX expressions when literals alone are sufficient
        // or enfore JSX expressions on literals in JSX children or attributes 🔧
        'react/jsx-curly-brace-presence': [2, {
            props: 'never',
            children: 'never',
            propElementValues: 'always',
        }],
        // Enforce consistent line breaks inside jsx curly 🔧
        'react/jsx-curly-newline': [2, {
            multiline: 'consistent',
            singleline: 'consistent',
        }],
        // Enforce or disallow spaces inside of curly braces in JSX attributes 🔧
        'react/jsx-curly-spacing': [2, 'never', {
            allowMultiline: true,
        }],
        // Disallow or enforce spaces around equal signs in JSX attributes 🔧
        'react/jsx-equals-spacing': [2, 'never'],
        // Restrict file extensions that may contain JSX
        'react/jsx-filename-extension': 0,
        // Ensure proper position of the first property in JSX 🔧
        'react/jsx-first-prop-new-line': [2, 'multiline-multiprop'],
        // Enforce shorthand or standard form for React fragments 🔧
        'react/jsx-fragments': [2, 'syntax'],
        // Enforce event handler naming conventions in JSX
        'react/jsx-handler-names': 0,
        // Validate JSX indentation 🔧
        'react/jsx-indent': 0,
        // Validate props indentation in JSX 🔧
        'react/jsx-indent-props': 0,
        // Report missing key props in iterators/collection literals
        'react/jsx-key': 1,
        // Validate JSX maximum depth
        'react/jsx-max-depth': 0,
        // Limit maximum of props on a single line in JSX 🔧
        'react/jsx-max-props-per-line': [2, {
            maximum: 1,
            when: 'multiline',
        }],
        // Prevent a new line after jsx elements and expressions 🔧  (v7.23.0)
        'react/jsx-newline': [2, {
            prevent: true,
        }],
        // Prevents usage of Function.prototype.bind and arrow functions in React component props
        'react/jsx-no-bind': [2, {
            ignoreDOMComponents: true,
            ignoreRefs: true,
            allowArrowFunctions: true,
            allowFunctions: false,
            allowBind: false,
        }],
        // Comments inside children section of tag should be placed inside braces
        'react/jsx-no-comment-textnodes': 2,
        // Prevents JSX context provider values from taking values that will cause needless rerenders (v7.22.0)
        'react/jsx-no-constructed-context-values': 0,
        // Enforce no duplicate props
        'react/jsx-no-duplicate-props': [2, {
            ignoreCase: true,
        }],
        // Disallow problematic && usage (v7.30.0)
        'react/jsx-no-leaked-render': 2,
        // Prevent using string literals in React component definition
        'react/jsx-no-literals': 0,
        // Forbid javascript: URLs
        'react/jsx-no-script-url': 2,
        // Forbid target="_blank" attribute without rel="noreferrer"
        'react/jsx-no-target-blank': [2, {
            enforceDynamicLinks: 'always',
        }],
        // Disallow undeclared variables in JSX
        'react/jsx-no-undef': 2,
        // Disallow unnecessary fragments 🔧
        'react/jsx-no-useless-fragment': 2,
        // Limit to one expression per line in JSX 🔧
        'react/jsx-one-expression-per-line': [2, {
            allow: 'non-jsx',
        }],
        // Enforce PascalCase for user-defined JSX components
        'react/jsx-pascal-case': [2, {
            allowAllCaps: false,
            allowLeadingUnderscore: true,
        }],
        // Disallow multiple spaces between inline JSX props 🔧
        'react/jsx-props-no-multi-spaces': 2,
        // Prevent JSX prop spreading
        'react/jsx-props-no-spreading': 0,
        // Enforce default props alphabetical sorting
        'react/jsx-sort-default-props': 0,
        // Enforce props alphabetical sorting 🔧
        'react/jsx-sort-props': [1, {
            callbacksLast: true,
            shorthandFirst: false,
            shorthandLast: false,
            ignoreCase: true,
            noSortAlphabetically: true,
            reservedFirst: true,
        }],
        // (DEPRECATED) Validate spacing before closing bracket in JSX 🔧
        'react/jsx-space-before-closing': 0,
        // Validate whitespace in and around the JSX opening and closing brackets 🔧
        'react/jsx-tag-spacing': [2, {
            closingSlash: 'never',
            beforeSelfClosing: 'never',
            afterOpening: 'never',
            beforeClosing: 'never',
        }],
        // Prevent React to be marked as unused
        'react/jsx-uses-react': hasAutomaticRuntime ? 0 : 2,
        // Prevent variables used in JSX to be marked as unused
        'react/jsx-uses-vars': 2,
        // Prevent missing parentheses around multilines JSX 🔧
        'react/jsx-wrap-multilines': [2, {
            declaration: 'parens-new-line',
            assignment: 'parens-new-line',
            return: 'parens-new-line',
            arrow: 'parens-new-line',
            condition: 'parens-new-line',
            logical: 'parens-new-line',
            prop: 'parens-new-line',
        }],

        // eslint-plugin-react-hooks rules

        // Checks rules of Hooks
        'react-hooks/rules-of-hooks': 2,
        // Checks effect dependencies
        'react-hooks/exhaustive-deps': 2,
    },
};