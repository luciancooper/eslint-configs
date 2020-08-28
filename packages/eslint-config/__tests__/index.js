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
        return {
            message,
            errors: parseInt(err, 10),
            code: (head + lines.slice(i + 1, j).join('\n')).trim(),
        };
    });
}

// create linter with config
const linter = new ESLint({
    baseConfig: config,
});

// jsdoc syntax tests
describe('jsdoc', () => {
    parseFixtures('jsdoc.js').forEach(({ message, errors, code }) => {
        test(message, async () => {
            expect.assertions(1);
            const [report] = await linter.lintText(code);
            expect(report.errorCount).toBe(errors);
        });
    });
});