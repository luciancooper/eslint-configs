const { RuleTester } = require('eslint'),
    rule = require('./top-level-padding-lines');

const tsParser = require.resolve('@typescript-eslint/parser');

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
    },
});

ruleTester.run('top-level-padding-lines', rule, {
    valid: [
        {
            code: "import { a } from 'a';\n"
                + "import { b } from 'b';\n\n"
                + "const c = require('c');\n"
                + "const d = require('d');\n\n"
                + 'const x = true;\n'
                + 'const y = false;\n\n'
                + 'const foo = () => {\n    /* ... */\n};\n\n'
                + '// comment above bar\n'
                + 'const bar = () => {\n    /* ... */\n};',
            options: ['always'],
        },
        {
            code: "import { a } from 'a';\n"
                + "import { b } from 'b';\n"
                + "const c = require('c');\n"
                + "const d = require('d');\n"
                + 'const x = true;\n'
                + 'const y = false;\n'
                + 'const foo = () => {\n    /* ... */\n};\n'
                + 'const bar = () => {\n    /* ... */\n};',
            options: ['never'],
        },
        {
            code: "import { a } from 'a';\n\n"
                + "import { b } from 'b';\n"
                + "const c = require('c');\n\n"
                + "const d = require('d');\n"
                + 'const x = true;\n\n'
                + 'const y = false;\n'
                + 'const foo = () => {\n    /* ... */\n};\n'
                + 'const bar = () => {\n    /* ... */\n};',
            options: ['never', { betweenSingleLines: 'always', betweenImports: 'always' }],
        },
        {
            code: 'const x = 0;\n'
                + 'const y = 1;\n\n'
                + 'const z = 2;',
            options: ['never', { betweenSingleLines: 'ignore' }],
        },
        {
            code: 'function fn(a: number, b: number): number;\n'
                + 'function fn(a: string): number;\n'
                + 'function fn(a: string | number, b?: number): number {\n'
                + '   return 5;\n'
                + '}',
            options: ['always', { betweenOverloads: 'never' }],
            parser: tsParser,
        },
        {
            code: 'export function fn(a: number, b: number): number;\n\n'
                + 'export function fn(a: string): number;\n\n'
                + 'export function fn(a: string | number, b?: number): number {\n'
                + '   return 5;\n'
                + '}',
            options: ['never', { betweenOverloads: 'always' }],
            parser: tsParser,
        },
    ],
    invalid: [
        {
            code: "import { a } from 'a';\n\n"
                + "import { b } from 'b';\n"
                + "const c = require('c');\n\n"
                + "const d = require('d');\n"
                + 'const x = true;\n\n'
                + 'const y = false;\n'
                + 'const foo = () => {\n    /* ... */\n};\n'
                + '// comment above bar\n'
                + 'const bar = () => {\n    /* ... */\n};',
            output: "import { a } from 'a';\n"
                + "import { b } from 'b';\n\n"
                + "const c = require('c');\n"
                + "const d = require('d');\n\n"
                + 'const x = true;\n'
                + 'const y = false;\n\n'
                + 'const foo = () => {\n    /* ... */\n};\n\n'
                + '// comment above bar\n'
                + 'const bar = () => {\n    /* ... */\n};',
            options: ['always'],
            errors: [
                { messageId: 'neverBetweenImports' },
                { messageId: 'always' },
                { messageId: 'neverBetweenImports' },
                { messageId: 'always' },
                { messageId: 'neverSingleLines' },
                { messageId: 'always' },
                { messageId: 'always' },
            ],
        },
        {
            code: "import { a } from 'a';\n"
                + "import { b } from 'b';\n\n"
                + "const c = require('c');\n"
                + "const d = require('d');\n\n"
                + 'const x = true;\n'
                + 'const y = false;\n\n'
                + 'const foo = () => {\n    /* ... */\n};\n\n'
                + 'const bar = () => {\n    /* ... */\n};',
            output: "import { a } from 'a';\n\n"
                + "import { b } from 'b';\n"
                + "const c = require('c');\n\n"
                + "const d = require('d');\n"
                + 'const x = true;\n\n'
                + 'const y = false;\n'
                + 'const foo = () => {\n    /* ... */\n};\n'
                + 'const bar = () => {\n    /* ... */\n};',
            options: ['never', { betweenSingleLines: 'always', betweenImports: 'always' }],
            errors: [
                { messageId: 'alwaysBetweenImports' },
                { messageId: 'never' },
                { messageId: 'alwaysBetweenImports' },
                { messageId: 'never' },
                { messageId: 'alwaysSingleLines' },
                { messageId: 'never' },
                { messageId: 'never' },
            ],
        },
        // 'never' fix deletes all blank lines between two statements
        {
            code: 'const x = true;\n\n'
                + '// first between statements\n\n'
                + '// second comment between statements\n\n'
                + 'const y = false;',
            output: 'const x = true;\n'
                + '// first between statements\n'
                + '// second comment between statements\n'
                + 'const y = false;',
            errors: [{ messageId: 'neverSingleLines' }],
        },
        // 'always' fix handles inline comments
        {
            code: 'const x = true; // inline comment\n'
                + 'const y = false;',
            output: 'const x = true; // inline comment\n\n'
                + 'const y = false;',
            options: ['always', { betweenSingleLines: 'always' }],
            errors: [{ messageId: 'alwaysSingleLines' }],
        },
        {
            code: 'export default function fn(a: number, b: number): number;\n'
                + 'export default function fn(a: string): number;\n\n'
                + 'export default function fn(a: string | number, b?: number): number { return 5; }',
            output: 'export default function fn(a: number, b: number): number;\n'
                + 'export default function fn(a: string): number;\n'
                + 'export default function fn(a: string | number, b?: number): number { return 5; }',
            options: ['always', { betweenOverloads: 'never' }],
            errors: [
                { messageId: 'neverBetweenOverloads' },
            ],
            parser: tsParser,
        },
    ],
});