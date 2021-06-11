# Enforce a consistent style for consecutive variable declarations (`consecutive-declarations`)

This rule requires consecutive `const`, `let`, and `var` declarations be combined into a single declaration, with the exception of global `const` declarations, which are to be split into multiple declaration statements.

## Rule Details

This rule is an alternative to ESLint's base [`one-var`](https://eslint.org/docs/rules/one-var) rule. It enforces the same style convention `one-var` does when configured with the [`'consecutive'`](https://github.com/eslint/eslint/blob/master/docs/rules/one-var.md#consecutive) option, with the exception of multi-line global `const` declarations, which are treated as if configured with [`'never'`](https://github.com/eslint/eslint/blob/master/docs/rules/one-var.md#never).

:no_entry_sign:&nbsp; Examples of **incorrect** code for this rule:

```js
/* eslint @lcooper/consecutive-declarations: 'error' */

const a = 1;
const b = 2;

const foo = () => {
        const c = 1;
        const d = 2;
    },
    bar = () => {
        let c = 1;
        let d = 2;
    };

let e = true;
let f = false;
```

:thumbsup:&nbsp; Examples of **correct** code for this rule:

```js
/* eslint @lcooper/consecutive-declarations: 'error' */

const a = 1,
    b = 2;

const foo = () => {
    const c = 1,
        d = 2;
};

const bar = () => {
    let c = 1,
        d = 2;
};

let e = true,
    f = false;
```

`var` declarations are treated the same as `let` declarations.

### `require` statements

All consecutive `require` statements are to be combined into a single declaration, separate from other global `const` declarations.

:no_entry_sign:&nbsp; Examples of **incorrect** code for this rule:

```js
/* eslint @lcooper/consecutive-declarations: 'error' */

const a = require('a');

const b = require('b'),
    c = 3;
```

:thumbsup:&nbsp; Examples of **correct** code for this rule:

```js
/* eslint @lcooper/consecutive-declarations: 'error' */

const a = require('a'),
    b = require('b');

const c = 3;
```

## When Not To Use It

If you are using ESLint's [`one-var`](https://eslint.org/docs/rules/one-var) rule and are happy with the style it enforces.

## Implementation

- [Rule source](../../lib/rules/consecutive-declarations.js)
- [Test source](../../lib/rules/consecutive-declarations.test.js)
