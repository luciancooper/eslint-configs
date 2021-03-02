const { ESLint } = require('eslint'),
    config = require('../index');

// create linter with config
const linter = new ESLint({
    baseConfig: config,
});

// jsdoc syntax tests
describe('jsdoc fixtures', () => {
    test.each(global.parseFixtures(__dirname, 'jsdoc.js'))('%s', (message, errors, code) => (
        expect(linter.lintText(code)).resolves.toHaveErrorCount(errors)
    ));
});

// no-mixed-operator tests
describe('no-mixed-operator fixtures', () => {
    test.each(global.parseFixtures(__dirname, 'operators.js'))('%s', (message, errors, code) => (
        expect(linter.lintText(code)).resolves.toHaveErrorCount(errors)
    ));
});