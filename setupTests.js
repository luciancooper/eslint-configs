const path = require('path'),
    fs = require('fs'),
    normalizePluginName = require('eslint-find-rules/dist/lib/normalize-plugin-name');

global.parseFixtures = (dirname, file) => {
    const filepath = path.join(dirname, '__fixtures__', file),
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

    toIncludePlugin(config, plugin) {
        const { module: moduleName, prefix } = normalizePluginName(plugin),
            isDefined = config.plugins.some((id) => (id === moduleName || id === prefix));
        return {
            message: isDefined
                ? () => `config includes ${moduleName}`
                : () => `config does not include ${moduleName}`,
            pass: isDefined,
        };
    },

    toConfigureNoUnknownPluginRules(config, plugin) {
        const { module: moduleName, prefix } = normalizePluginName(plugin),
            // eslint-disable-next-line @lcooper/global-require, import/no-dynamic-require
            pluginModule = require(moduleName),
            // transform rules object into a list of deprecated rules
            pluginRules = Object.keys(pluginModule.rules).map((id) => `${prefix}/${id}`),
            // get list of unknown configured rules for this plugin
            unknownRules = Object.keys(config.rules)
                .filter((name) => (name.startsWith(`${prefix}/`) && !pluginRules.includes(name)));
        return {
            message: unknownRules.length > 0 ? () => (
                `The following rules configured for ${moduleName} are not defined by the plugin:\n${
                    unknownRules.map((id) => `\n * '${id}'`).join('')
                }`
            ) : () => `All rules configured for ${moduleName} are defined by the plugin`,
            pass: unknownRules.length === 0,
        };
    },

    toEnableNoDeprecatedPluginRules(config, plugin) {
        const { module: moduleName, prefix } = normalizePluginName(plugin),
            // eslint-disable-next-line @lcooper/global-require, import/no-dynamic-require
            pluginModule = require(moduleName),
            // transform rules object into a list of deprecated rules
            deprecatedPluginRules = Object.entries(pluginModule.rules)
                .filter(([, { meta }]) => meta.deprecated)
                .map(([id]) => `${prefix}/${id}`),
            // get list of enabled plugin rules that are deprecated
            deprecated = Object.entries(config.rules).filter(([id, conf]) => {
                if (!id.startsWith(`${prefix}/`)) return false;
                if (!deprecatedPluginRules.includes(id)) return false;
                // determine rule config level
                let level = conf;
                if (Array.isArray(level)) [level] = level;
                // deprecated rules are fine if they are turned off
                return !(level === 'off' || level === 0);
            });

        return {
            message: deprecated.length > 0 ? () => (
                `The following rules configured for ${moduleName} are deprecated:\n${
                    deprecated.map((id) => `\n * '${id}'`).join('')
                }`
            ) : () => `This config defines no deprecated rules for ${moduleName}`,
            pass: deprecated.length === 0,
        };
    },

    toConfigureAllPluginRules(config, plugin) {
        const { module: moduleName, prefix } = normalizePluginName(plugin);
        // eslint-disable-next-line @lcooper/global-require, import/no-dynamic-require
        let { rules: pluginRules } = require(moduleName);
        // transform rules object into a list of all non-deprecated rules
        pluginRules = Object.entries(pluginRules)
            .filter(([, { meta }]) => !meta.deprecated)
            .map(([id]) => `${prefix}/${id}`);
        // create a list of unconfigured plugin rules
        const unconfigured = pluginRules.filter((id) => !Object.hasOwnProperty.call(config.rules, id));
        return {
            message: unconfigured.length > 0 ? () => (
                `The following rules for ${moduleName} have not been configured:\n${
                    unconfigured.map((id) => `\n * '${id}'`).join('')
                }`
            ) : () => `All rules for ${moduleName} have been configured`,
            pass: unconfigured.length === 0,
        };
    },
});