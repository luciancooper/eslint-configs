/* eslint-disable no-template-curly-in-string */
const { RuleTester } = require('eslint'),
    rule = require('./prefer-template');

const ruleTester = new RuleTester({
    languageOptions: {
        sourceType: 'commonjs',
    },
});

ruleTester.run('prefer-template', rule, {
    valid: [
        "'use strict';",
        "var foo = 'foo' + '\\0';",
        "var foo = 'bar';",
        "var foo = 'bar' + 'baz';",
        "var foo = foo + +'100';",
        'var foo = `bar`;',
        'var foo = `hello, ${name}!`;',
        'var foo = `foo` + `bar` + "hoge";',
        'var foo = `foo` +\n    `bar` +\n    "hoge";',
        // this would be an error in the original `prefer-template` rule
        "var foo = 'favorites: ' +\n"
        + '    favorites.map(f => {\n'
        + '        return f.name;\n'
        + '    }) +\n'
        + "';';",
    ],
    invalid: [
        {
            code: "var foo = 'hello, ' + name + '!';",
            output: 'var foo = `hello, ${  name  }!`;',
            errors: [{ messageId: 'unexpectedStringConcatenation' }],
        },
        {
            code: "var foo = bar + 'baz';",
            output: 'var foo = `${bar  }baz`;',
            errors: [{ messageId: 'unexpectedStringConcatenation' }],
        },
        {
            code: 'var foo = bar + `baz`;',
            output: 'var foo = `${bar  }baz`;',
            errors: [{ messageId: 'unexpectedStringConcatenation' }],
        },
        {
            code: "var foo = +100 + 'yen';",
            output: 'var foo = `${+100  }yen`;',
            errors: [{ messageId: 'unexpectedStringConcatenation' }],
        },
        {
            code: "var foo = 'bar' + baz;",
            output: 'var foo = `bar${  baz}`;',
            errors: [{ messageId: 'unexpectedStringConcatenation' }],
        },
        {
            code: "var foo = '￥' + (n * 1000) + '-'",
            output: 'var foo = `￥${  n * 1000  }-`',
            errors: [{ messageId: 'unexpectedStringConcatenation' }],
        },
        {
            code: "var foo = 'aaa' + aaa; var bar = 'bbb' + bbb;",
            output: 'var foo = `aaa${  aaa}`; var bar = `bbb${  bbb}`;',
            errors: [
                { messageId: 'unexpectedStringConcatenation' },
                { messageId: 'unexpectedStringConcatenation' },
            ],
        },
        {
            code: "var string = (number + 1) + 'px';",
            output: 'var string = `${number + 1  }px`;',
            errors: [{ messageId: 'unexpectedStringConcatenation' }],
        },
        {
            code: "var string = 'pixels: '\n"
                + "  + (number + 1) + 'px';",
            output: "var string = 'pixels: '\n"
                + '  + `${number + 1  }px`;',
            errors: [{ messageId: 'unexpectedStringConcatenation' }],
        },
        {
            code: "var string = 'pixels: ' + (number + 1)\n"
                + "  + 'px';",
            output: 'var string = `pixels: ${  number + 1}`\n'
                + "  + 'px';",
            errors: [{ messageId: 'unexpectedStringConcatenation' }],
        },
        {
            code: "var foo = 'bar' + baz + 'qux';",
            output: 'var foo = `bar${  baz  }qux`;',
            errors: [{ messageId: 'unexpectedStringConcatenation' }],
        },
        {
            code: "var foo = '0 backslashes: ${bar}' + baz;",
            output: 'var foo = `0 backslashes: \\${bar}${  baz}`;',
            errors: [{ messageId: 'unexpectedStringConcatenation' }],
        },
        {
            code: "var foo = '1 backslash: \\${bar}' + baz;",
            output: 'var foo = `1 backslash: \\${bar}${  baz}`;',
            errors: [{ messageId: 'unexpectedStringConcatenation' }],
        },
        {
            code: "var foo = '2 backslashes: \\\\${bar}' + baz;",
            output: 'var foo = `2 backslashes: \\\\\\${bar}${  baz}`;',
            errors: [{ messageId: 'unexpectedStringConcatenation' }],
        },
        {
            code: "var foo = '3 backslashes: \\\\\\${bar}' + baz;",
            output: 'var foo = `3 backslashes: \\\\\\${bar}${  baz}`;',
            errors: [{ messageId: 'unexpectedStringConcatenation' }],
        },
        {
            code: "var foo = bar + 'this is a backtick: `' + baz;",
            output: 'var foo = `${bar  }this is a backtick: \\`${  baz}`;',
            errors: [{ messageId: 'unexpectedStringConcatenation' }],
        },
        {
            code: "var foo = bar + 'this is a backtick preceded by a backslash: \\`' + baz;",
            output: 'var foo = `${bar  }this is a backtick preceded by a backslash: \\`${  baz}`;',
            errors: [{ messageId: 'unexpectedStringConcatenation' }],
        },
        {
            code: "var foo = bar + 'this is a backtick preceded by two backslashes: \\\\`' + baz;",
            output: 'var foo = `${bar  }this is a backtick preceded by two backslashes: \\\\\\`${  baz}`;',
            errors: [{ messageId: 'unexpectedStringConcatenation' }],
        },
        {
            code: 'var foo = bar + `${baz}foo`;',
            output: 'var foo = `${bar  }${baz}foo`;',
            errors: [{ messageId: 'unexpectedStringConcatenation' }],
        },
        {
            code:
            "var foo = 'favorites: ' + favorites.map(f => {\n"
            + '    return f.name;\n'
            + "}) + ';';",
            output:
            'var foo = `favorites: ${  favorites.map(f => {\n'
            + '    return f.name;\n'
            + '})  };`;',
            errors: [{ messageId: 'unexpectedStringConcatenation' }],
        },
        {
            code: "var foo = bar + baz + 'qux';",
            output: 'var foo = `${bar + baz  }qux`;',
            errors: [{ messageId: 'unexpectedStringConcatenation' }],
        },
        {
            code: "var foo = /* a */ 'bar' /* b */ + /* c */ baz /* d */ + 'qux' /* e */ ;",
            output: 'var foo = /* a */ `bar${ /* b */  /* c */ baz /* d */  }qux` /* e */ ;',
            errors: [{ messageId: 'unexpectedStringConcatenation' }],
        },
        {
            code: "var foo = bar + ('baz') + 'qux' + (boop);",
            output: 'var foo = `${bar  }baz` + `qux${  boop}`;',
            errors: [{ messageId: 'unexpectedStringConcatenation' }],
        },
        {
            code: "foo + 'unescapes an escaped single quote in a single-quoted string: \\''",
            output: "`${foo  }unescapes an escaped single quote in a single-quoted string: '`",
            errors: [{ messageId: 'unexpectedStringConcatenation' }],
        },
        {
            code: 'foo + "unescapes an escaped double quote in a double-quoted string: \\""',
            output: '`${foo  }unescapes an escaped double quote in a double-quoted string: "`',
            errors: [{ messageId: 'unexpectedStringConcatenation' }],
        },
        {
            code: "foo + 'does not unescape an escaped double quote in a single-quoted string: \\\"'",
            output: '`${foo  }does not unescape an escaped double quote in a single-quoted string: \\"`',
            errors: [{ messageId: 'unexpectedStringConcatenation' }],
        },
        {
            code: "foo + \"does not unescape an escaped single quote in a double-quoted string: \\'\"",
            output: "`${foo  }does not unescape an escaped single quote in a double-quoted string: \\'`",
            errors: [{ messageId: 'unexpectedStringConcatenation' }],
        },
        {
            code: "foo + 'handles unicode escapes correctly: \\x27'", // "\x27" === "'"
            output: '`${foo  }handles unicode escapes correctly: \\x27`',
            errors: [{ messageId: 'unexpectedStringConcatenation' }],
        },
        {
            code: "foo + 'does not autofix octal escape sequence' + '\\033'",
            output: null,
            errors: [{ messageId: 'unexpectedStringConcatenation' }],
        },
        {
            code: "foo + 'does not autofix non-octal decimal escape sequence' + '\\8'",
            output: null,
            errors: [{ messageId: 'unexpectedStringConcatenation' }],
        },
        {
            code: "foo + '\\n other text \\033'",
            output: null,
            errors: [{ messageId: 'unexpectedStringConcatenation' }],
        },
        {
            code: "foo + '\\0\\1'",
            output: null,
            errors: [{ messageId: 'unexpectedStringConcatenation' }],
        },
        {
            code: "foo + '\\08'",
            output: null,
            errors: [{ messageId: 'unexpectedStringConcatenation' }],
        },
        {
            code: "foo + '\\\\033'",
            output: '`${foo  }\\\\033`',
            errors: [{ messageId: 'unexpectedStringConcatenation' }],
        },
        {
            code: "foo + '\\0'",
            output: '`${foo  }\\0`',
            errors: [{ messageId: 'unexpectedStringConcatenation' }],
        },
    ],
});