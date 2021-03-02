const { ESLint } = require('eslint'),
    config = require('..');

const linter = new ESLint({
    useEslintrc: false,
    allowInlineConfig: false,
    baseConfig: config,
});

describe('jest config', () => {
    test('is applied to files with test suffixes', async () => {
        await expect(linter.calculateConfigForFile('index.test.js')).resolves.toMatchObject({
            plugins: ['jest'],
        });
        await expect(linter.calculateConfigForFile('index.js')).resolves.not.toMatchObject({
            plugins: ['jest'],
        });
    });

    test('is applied to top-level files in test directories', async () => {
        await expect(linter.calculateConfigForFile('test/index.js')).resolves.toMatchObject({
            plugins: ['jest'],
        });
        await expect(linter.calculateConfigForFile('test/utils/index.js')).resolves.not.toMatchObject({
            plugins: ['jest'],
        });
    });

    test('is applied to top-level files in the __mocks__ directory', async () => {
        await expect(linter.calculateConfigForFile('__mocks__/index.js')).resolves.toMatchObject({
            plugins: ['jest'],
        });
        await expect(linter.calculateConfigForFile('__mocks__/utils/index.js')).resolves.not.toMatchObject({
            plugins: ['jest'],
        });
    });
});