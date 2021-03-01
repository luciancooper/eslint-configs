const path = require('path'),
    fs = require('fs');

global.parseFixtures = (dirname, file) => {
    const filepath = path.join(dirname, 'fixtures', file),
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
        const { 1: err, 2: message } = lines[i].match(/^\/\/! test\[(\d+)\] (.+)$/),
            errors = parseInt(err, 10),
            code = (head + lines.slice(i + 1, j).join('\n')).trim();
        // return the test item
        return [message, errors, code];
    });
};

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