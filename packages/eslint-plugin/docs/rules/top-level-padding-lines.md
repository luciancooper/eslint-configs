# Require or disallow padding lines between top level statements (`top-level-padding-lines`)

This rule aims to improve readability by enforcing consistent spacing between top level statements. It is similar to ESLint's base [`lines-between-class-members`](https://eslint.org/docs/rules/lines-between-class-members) rule, but applies to statements in the global scope rather than class members.

## Rule Details

:no_entry_sign:&nbsp; Examples of **incorrect** code for this rule:

```js
/* eslint @lcooper/top-level-padding-lines: 'error' */
import { a } from 'a';

import { b } from 'b';
const foo = () => {
    // ...
};
const bar = () => {
    // ...
};
const x = true;

const y = false;
```

:thumbsup:&nbsp; Examples of **correct** code for this rule:

```js
/* eslint @lcooper/top-level-padding-lines: 'error' */
import { a } from 'a';
import { b } from 'b';

const foo = () => {
    // ...
};

const bar = () => {
    // ...
};

const x = true;
const y = false;
```

### Options

The rule takes two options. The first is a string, which can be:

* `'always'` - (default) requires an empty line between top level statements.
* `'never'` - disallows an empty line between top level statements.

The second option is an object that overrides the rule's behavior in two specific contexts:

 * `betweenSingleLines` - Require or forbid a blank line between single line top level statements (defaults to `'never'`).
 * `betweenImports` - Require or forbid a blank line between esm import or commonjs `require` statements (defaults to `'never'`).

Here is the default configuration:

```json
{
    "@lcooper/top-level-padding-lines": ["error", "always", {
        "betweenSingleLines": "never",
        "betweenImports": "never"
    }]
}
```

## When Not To Use It

If you don't care about enforcing a consistant number of blank lines between top level statements, don't use this rule.

## Implementation

- [Rule source](../../lib/rules/top-level-padding-lines.js)
- [Test source](../../lib/rules/top-level-padding-lines.test.js)
