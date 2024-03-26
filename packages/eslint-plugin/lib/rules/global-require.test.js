const { FlatRuleTester } = require('eslint/use-at-your-own-risk'),
    rule = require('./global-require');

const ruleTester = new FlatRuleTester({
    languageOptions: {
        sourceType: 'commonjs',
    },
});

ruleTester.run('global-require', rule, {
    valid: [
        // variable declaration
        "const x = require('x');",
        // assignment expression
        "let x; x = require('y');",
        // variable declaration of member expression
        "const x = require('x').x",
        // expression statement
        "require('x');",
        // member expression
        "require('x').x();",
        // object expression variable declaration
        "const x = { x: require('x') };",
        // assignment of an object expression to member expression
        "module.exports = { x: require('x') };",
        // assignment of an array expression to member expression
        "module.exports = [...require('x')];",
        // conditional expression argument
        "const logger = require(DEBUG ? 'dev-logger' : 'logger');",
        // within a conditional expression
        "const logger = DEBUG ? require('dev-logger') : require('logger');",
        // shadowed require function
        "function shadowedRequire(require) { const x = require('x'); }",
        // member expression named 'require'
        "if (x) { x.require('x'); }",
        // optional chaining
        "const x = require('x')?.x;",
    ],
    invalid: [
        // if statement
        "if (x) { require('x'); }",
        // non-block if statement
        "if (x) require('x');",
        // assignment within non-block if statement
        "let x; if (y) x = require('x');",
        // a function declaration
        "function x() { require('x') }",
        // a function expression
        "const x = function() { require('x') }",
        // an arrow function
        'const getModule = (x) => { require(x); }',
        // non-block arrow function
        'const getModule = (x) => require(x);',
        // non-block IIFE arrow function
        "((x) => require(x))('x')",
        // try-catch block
        "try { require('x'); } catch (e) { console.log(e); }",
        // non-block for statement
        "for (let i = 0; i < 1; i++) require('x');",
        // non-block for in statement
        "for (const i in [1]) require('x');",
        // non-block for of statement
        "for (const x in ['x']) require(x);",
        // non-block while statement
        "while (true) require('x');",
        // non-block do-while statement
        "do require('x'); while (true);",
        // switch statement
        "switch(x) { case 'x': require('x'); break; }",
        // within an object expression method
        "module.exports = { x() { require('x'); } };",
        // within an object expression getter field
        "module.exports = { get x() { return require('x'); } };",
        // with in a class declaration method
        "class Foo { x() { require('x'); } }",
        // within a class declaration getter field
        "class Foo { get x() { return require('x'); } }",
        // with in a class expression method
        "const Foo = class { x() { require('x'); } }",
        // within a class expression getter field
        "const Foo = class { get x() { return require('x'); } }",
    ].map((code) => ({
        code,
        errors: [{ messageId: 'unexpected' }],
    })),
});