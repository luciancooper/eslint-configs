# Suggest using template literals instead of string concatenation (`prefer-template`)

This is a more permissive version of ESLint's base [`prefer-template`](https://eslint.org/docs/rules/prefer-template) rule. It works the same as the base rule, but allows concatenation as long as each operand is on its own line. This is the same exception made by the base [`no-useless-concat`](https://eslint.org/docs/rules/no-useless-concat) rule, which allows multiline string concatenation.

## Rule Details

Like the base rule, this rule is aimed to flag usage of `+` operators with strings.

:no_entry_sign:&nbsp; Examples of **incorrect** code for this rule:

```js
/* eslint @lcooper/prefer-template: 'error' */

var str = 'Hello, ' + name + '!';
var str = 'Time: ' + (12 * 60 * 60 * 1000);

var str = 'favorites: ' + favorites.map(f => {
        return f.name;
    });
```

:thumbsup:&nbsp; Examples of **correct** code for this rule:

```js
/* eslint @lcooper/prefer-template: 'error' */

var str = 'Hello World!';
var str = `Hello, ${name}!`;
var str = `Time: ${12 * 60 * 60 * 1000}`;

// This is reported by `no-useless-concat`.
var str = 'Hello, ' + 'World!';

// This is correct using this rule, but incorrect under the base rule
var str = 'Hello, '
    + name
    + '!';
```

## When Not To Use It

If you are using ESLint's [`prefer-template`](https://eslint.org/docs/rules/prefer-template) rule and are happy with it, you don't need this rule.

## Implementation

- [Rule source](../../lib/rules/prefer-template.js)
- [Test source](../../lib/rules/prefer-template.test.js)
