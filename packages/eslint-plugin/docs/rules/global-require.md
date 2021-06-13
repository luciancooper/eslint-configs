# Ensure require() calls are in the top-level module scope (`global-require`)

This rule is a more permissive version of ESLint's base [`global-require`](https://eslint.org/docs/rules/global-require) rule. **Note:** [ESLint moved this rule](https://eslint.org/blog/2020/02/whats-coming-in-eslint-7.0.0#deprecating-nodejscommonjs-specific-rules) to [`node/global-require`](https://github.com/mysticatea/eslint-plugin-node/blob/v11.1.0/docs/rules/global-require.md) in `v7.0.0`. 

It works the same as the base rule, but allows for `require` calls within any expression in the global scope. This accomidates a pattern commonly found within `index.js` files, in which `require` calls are used in expressions assigned to `module.exports`:

```js
// require within an object expression
module.exports = {
    prop: require('./somethingLocal'),
};
```

Check out the [Eslint docs](https://eslint.org/docs/rules/global-require) for more information about this rule.

## Rule Details

:no_entry_sign:&nbsp; Examples of **incorrect** code for this rule:

```js
/* eslint @lcooper/global-require: 'error' */

// require calls within an if statement are not allowed
if (DEBUG) require('debug');

// require calls inside a function body are not allowed
function getModule(name) {
    return require(name);
}

// you may not require() inside of a try/catch block
try {
    require(unsafeModule);
} catch(e) {
    console.log(e);
}
```

:thumbsup:&nbsp; Examples of **correct** code for this rule:

```js
/* eslint @lcooper/global-require: 'error' */

// require variable declarations
const x = require('x');

// require expression statements
require('y');

// conditional expression to determine what to require
const logger = DEBUG ? require('dev-logger') : require('logger');

// require within an object expression
module.exports = {
    prop: require('./somethingLocal'),
};
```

## When Not To Use It

To quote from the [Eslint docs](https://eslint.org/docs/rules/global-require#when-not-to-use-it):

> If you have a module that must be initialized with information that comes from the file-system or if a module is only used in very rare situations and will cause significant overhead to load it may make sense to disable the rule. If you need to `require()` an optional dependency inside of a `try`/`catch`, you can disable this rule for just that dependency using the `// eslint-disable-line @lcooper/global-require` comment.

## Implementation

- [Rule source](../../lib/rules/global-require.js)
- [Test source](../../lib/rules/global-require.test.js)
