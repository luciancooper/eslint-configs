const { ESLint } = require('eslint'),
    fs = require('fs'),
    path = require('path'),
    config = require('../index');

function parseFixtures(file) {
    const filepath = path.join(__dirname, 'fixtures', file),
        lines = fs.readFileSync(filepath, 'utf8').split('\n'),
        chunks = lines
            .map((l, i) => (/^\/\/! test\[\d+\] /.test(l) ? i : null))
            .filter((i) => i !== null)
            .map((i, j, array) => [i, array[j + 1]]);
    // check that at least 1 chunk was found
    if (!chunks.length) {
        throw new Error(`No test chunks found in fixtures file '${file}'`);
    }
    // get first marker line
    const [[h]] = chunks,
        head = lines.slice(0, h).join('\n').trim('\n');
    // transform each test chunk
    return chunks.map(([i, j]) => {
        // parse the header line
        const { 1: err, 2: message } = lines[i].match(/^\/\/! test\[(\d+)\] (.+)$/);
        // return the test item
        return [
            message,
            parseInt(err, 10),
            (head + lines.slice(i + 1, j).join('\n')).trim(),
        ];
    });
}

// create linter with config
const linter = new ESLint({
    baseConfig: config,
});

// add custom expect matcher
expect.extend({
    toHaveErrorCount(received, count) {
        const [report] = received;
        // check to see if the expected number of errors were found
        if (report.errorCount === count) {
            return {
                message: () => `expected ${count} errors and found ${report.errorCount}`,
                pass: true,
            };
        }
        return {
            // create more detailed message
            message: () => [
                `expected ${count} errors but found ${report.errorCount}`,
                ...report.messages.map(({ ruleId, message }) => ` - [${ruleId}]: ${message}`),
            ].join('\n'),
            pass: false,
        };
    },
});

// jsdoc syntax tests
describe('JSDoc', () => {
    test.each(parseFixtures('jsdoc.js'))('%s', (message, errors, code) => (
        expect(linter.lintText(code)).resolves.toHaveErrorCount(errors)
    ));
});

// no-mixed-operator tests
describe('Mixed Operators', () => {
    test.each(parseFixtures('operators.js'))('%s', (message, errors, code) => (
        expect(linter.lintText(code)).resolves.toHaveErrorCount(errors)
    ));
});