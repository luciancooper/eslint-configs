const { FlatRuleTester } = require('eslint/use-at-your-own-risk'),
    rule = require('./consecutive-declarations');

const ruleTester = new FlatRuleTester({
    languageOptions: {
        sourceType: 'commonjs',
    },
});

ruleTester.run('consecutive-declarations', rule, {
    valid: [
        // declaration kinds in the top-level scope
        'var a, b; const c = 1, d = 2; let e, f;',
        // const declarations not in the top-level scope
        '{const a = 1, b = 2;}',
        // mixture of require and regular declarations
        "const a = require('a');\n"
        + 'const b = 5',
        // multi-line const declarations in the top-level scope
        'const a = {\n'
        + '    x: 5,\n'
        + '};\n'
        + 'const b = {\n'
        + '    x: 6,\n'
        + '}',
        // multi line assignment patterns
        'const {\n'
        + '        a,\n'
        + '    } = { a: 5 },\n'
        + '    b = 6;',
        // require declarations should be grouped separately from other declarations
        "const a = require('a'),\n"
        + "    b = require('b');\n"
        + 'const c = 3;',
        "const a = require('a');\n"
        + 'const b = 2,\n'
        + '    c = 3;\n'
        + 'const d = {\n'
        + '    x: 5,\n'
        + '};',
        // for of loops
        'for (let x of a) {}; for (const y of a) {}; for (var z of a) {}',
        // for in loops
        'for (let x in a) {}; for (const y in a) {}; for (var z in a) {}',
    ],
    invalid: [
        // combine
        {
            code: 'var a = true; var b = false;',
            output: 'var a = true,  b = false;',
            errors: [{ messageId: 'combine', line: 1, column: 15 }],
        },
        {
            code: 'let a = 0, b; let c = 1',
            output: 'let a = 0, b,  c = 1',
            errors: [{ messageId: 'combine', line: 1, column: 15 }],
        },
        {
            code: '{const a = 0, b = 1; const c = 2;}',
            output: '{const a = 0, b = 1,  c = 2;}',
            errors: [{ messageId: 'combine', line: 1, column: 22 }],
        },
        {
            code: '{const a = 0; // comment beside\n'
            + 'const b = 2}',
            output: '{const a = 0, // comment beside\n'
            + ' b = 2}',
            errors: [{ messageId: 'combine', data: { kind: 'const' } }],
        },
        {
            code: 'const a = 0; const b = 1;',
            output: 'const a = 0,  b = 1;',
            errors: [{ messageId: 'combine', line: 1, column: 14 }],
        },
        // split
        {
            code: 'const a = 0, // comment beside\n'
            + '    b = {\n'
            + '        x: 5,\n'
            + '    };',
            output: 'const a = 0; // comment beside\n'
            + '    const b = {\n'
            + '        x: 5,\n'
            + '    };',
            errors: [{ messageId: 'split', line: 1, column: 1 }],
        },
        {
            code: 'export const a = 1,\n'
            + '    b = {\n'
            + '        x: 5,\n'
            + '    };\n',
            output: 'export const a = 1;\n'
            + '    export const b = {\n'
            + '        x: 5,\n'
            + '    };\n',
            languageOptions: { sourceType: 'module' },
            errors: [{ messageId: 'split', line: 1, column: 8 }],
        },
        {
            code: "const a = require('a'),\n"
            + "    b = require('b');\n"
            + 'const c = {\n'
            + '        x: 5,\n'
            + '    },\n'
            + '    d = 2;',
            output: "const a = require('a'),\n"
            + "    b = require('b');\n"
            + 'const c = {\n'
            + '        x: 5,\n'
            + '    };\n'
            + '    const d = 2;',
            errors: [{ messageId: 'split', line: 3, column: 1 }],
        },
        // mixedRequires
        {
            code: "const a = require('a'),\n"
            + "    b = require('b'),\n"
            + '    c = 3;',
            output: "const a = require('a'),\n"
            + "    b = require('b');\n"
            + '    const c = 3;',
            errors: [{ messageId: 'mixedRequires', line: 1, column: 1 }],
        },
        {
            code: 'const b = 2,\n'
            + '    c = 3,\n'
            + "    a = require('a')",
            output: "const a = require('a');\n"
            + '    const b = 2,\n'
            + '    c = 3',
            errors: [{ messageId: 'mixedRequires', line: 1, column: 1 }],
        },
        {
            code: "const a = require('a'),\n"
            + '    c = 3, // comment beside c\n'
            + '    // comment above b\n'
            + "    b = require('b')",
            output: "const a = require('a'),\n"
            + '    // comment above b\n'
            + "    b = require('b');\n"
            + '    const c = 3 // comment beside c',
            errors: [{ messageId: 'mixedRequires', line: 1, column: 1 }],
        },
        {
            code: 'const b = 2,\n'
            + '    // comment above a\n'
            + "    a = require('a'), // comment beside a\n"
            + '    c = 3;',
            output: '// comment above a\n'
            + "    const a = require('a'); // comment beside a\n"
            + '    const b = 2,\n'
            + '    c = 3;',
            errors: [{ messageId: 'mixedRequires', line: 1, column: 1 }],
        },
        {
            code: "const a = require('a'),\n"
            + "    b = require('b'),\n"
            + '    c = 2,\n'
            + '    d = {\n'
            + '        x: 5,\n'
            + '    };',
            output: "const a = require('a'),\n"
            + "    b = require('b');\n"
            + '    const c = 2;\n'
            + '    const d = {\n'
            + '        x: 5,\n'
            + '    };',
            errors: [{ messageId: 'mixedRequires', line: 1, column: 1 }],
        },
        {
            code: '// comment above a\n'
            + "const a = require('a'), // comment beside a\n"
            + '    // comment above c\n'
            + '    c = 2, // comment beside c\n'
            + '    // comment above d\n'
            + '    d = {\n'
            + '        x: 5,\n'
            + '    }, // comment beside d\n'
            + '    // comment above b\n'
            + "    b = require('b'); // comment beside b",
            output: '// comment above a\n'
            + "const a = require('a'), // comment beside a\n"
            + '    // comment above b\n'
            + "    b = require('b'); // comment beside b\n"
            + '    // comment above c\n'
            + '    const c = 2; // comment beside c\n'
            + '    // comment above d\n'
            + '    const d = {\n'
            + '        x: 5,\n'
            + '    }; // comment beside d',
            errors: [{ messageId: 'mixedRequires', line: 2, column: 1 }],
        },
    ],
});