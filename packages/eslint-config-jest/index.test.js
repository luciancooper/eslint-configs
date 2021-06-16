const { ESLint } = require('eslint'),
    baseConfig = require('.');

const linter = new ESLint({
    useEslintrc: false,
    allowInlineConfig: false,
    baseConfig,
});

describe('config override globs', () => {
    test('match test setup files', async () => {
        await expect(linter.calculateConfigForFile('setupTests.js')).resolves.toIncludePlugin('jest');
        await expect(linter.calculateConfigForFile('jest.setup.js')).resolves.toIncludePlugin('jest');
        await expect(linter.calculateConfigForFile('jest.config.js')).resolves.not.toIncludePlugin('jest');
    });

    test('match files named `test.*`', async () => {
        await expect(linter.calculateConfigForFile('test.js')).resolves.toIncludePlugin('jest');
        await expect(linter.calculateConfigForFile('test.ts')).resolves.toIncludePlugin('jest');
    });

    test('match files with `.test.*` and `.spec.*` suffixes', async () => {
        await expect(linter.calculateConfigForFile('index.test.js')).resolves.toIncludePlugin('jest');
        await expect(linter.calculateConfigForFile('index.spec.js')).resolves.toIncludePlugin('jest');
        await expect(linter.calculateConfigForFile('index.js')).resolves.not.toIncludePlugin('jest');
    });

    test('does not match snapshot files with extension `.snap`', async () => {
        await expect(linter.calculateConfigForFile('file.js.snap')).resolves.not.toIncludePlugin('jest');
        await expect(linter.calculateConfigForFile('__snapshots__/file.js.snap')).resolves.not.toIncludePlugin('jest');
    });

    describe.each([
        'test',
        'tests',
        '__tests__',
        '__mocks__',
    ])('files in `%s/`', (dir) => {
        test('matches test files', async () => {
            await expect(linter.calculateConfigForFile(`${dir}/file.js`)).resolves.toIncludePlugin('jest');
            await expect(linter.calculateConfigForFile(`${dir}/utils/file.js`)).resolves.toIncludePlugin('jest');
        });

        test('does not match fixture files', async () => {
            await expect(linter.calculateConfigForFile(`${dir}/fixtures/file.js`))
                .resolves.not.toIncludePlugin('jest');
            await expect(linter.calculateConfigForFile(`${dir}/__fixtures__/file.js`))
                .resolves.not.toIncludePlugin('jest');
        });

        test('does not match snapshot files', async () => {
            await expect(linter.calculateConfigForFile(`${dir}/file.js.snap`))
                .resolves.not.toIncludePlugin('jest');
            await expect(linter.calculateConfigForFile(`${dir}/__snapshots__/file.js.snap`))
                .resolves.not.toIncludePlugin('jest');
        });
    });
});

describe('`jest` plugin', () => {
    let config;

    beforeAll(async () => {
        config = await linter.calculateConfigForFile('index.test.js');
    });

    test('configures no unknown `jest/` plugin rules', () => {
        expect(config).toConfigureNoUnknownPluginRules('jest');
    });

    test('enables no deprecated `jest/` plugin rules', () => {
        expect(config).toEnableNoDeprecatedPluginRules('jest');
    });

    test('includes all `jest/` plugin rules', () => {
        expect(config).toConfigureAllPluginRules('jest');
    });
});