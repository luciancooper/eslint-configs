const path = require('path'),
    fs = require('fs'),
    normalizePluginName = require('eslint-find-rules/dist/lib/normalize-plugin-name');

global.analyzePluginRules = (config) => {
    // get all configured rules
    const configRules = config.rules || {},
        configRuleNames = Object.keys(configRules);
    // for each plugin configured, do rule analysis
    return (config.plugins || []).reduce((acc, pid) => {
        const { module: moduleName, prefix } = normalizePluginName(pid),
            // eslint-disable-next-line global-require, import/no-dynamic-require
            plugin = require(moduleName),
            // get list of configured rules for this plugin
            rules = configRuleNames.filter((name) => name.startsWith(`${prefix}/`));
        // create list of all plugin rules and their deprecated status
        let pluginRules = Object.entries(plugin.rules || {}).map(([id, rule]) => [
            `${prefix}/${id}`,
            rule && rule.meta && rule.meta.deprecated,
        ]);
        // split list into two id string arrays for depricated and available rules
        const deprecated = pluginRules.filter(([, d]) => d).map(([id]) => id),
            available = pluginRules.filter(([, d]) => !d).map(([id]) => id);
        // transform array into list of rule id strings for all rules
        pluginRules = pluginRules.map(([id]) => id);
        // assign info object as plugin entry
        acc[prefix] = {
            unknown: rules.filter((id) => !pluginRules.includes(id)),
            deprecated: rules.filter((id) => {
                if (!deprecated.includes(id)) return false;
                // determine rule config level
                let level = configRules[id];
                if (Array.isArray(level)) [level] = level;
                // deprecated rules are fine if they are turned off
                return !(level === 'off' || level === 0);
            }),
            unused: available.filter((id) => !rules.includes(id)),
        };
        return acc;
    }, {});
};

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