const path = require('path'),
    fs = require('fs'),
    chalk = require('chalk');

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
        const isDefined = Object.keys(config?.plugins ?? {}).includes(plugin);
        return {
            message: isDefined
                ? () => `config includes ${plugin}`
                : () => `config does not include ${plugin}`,
            pass: isDefined,
        };
    },

    toIncludePlugins(config, plugins) {
        const matched = [],
            unMatched = [],
            // copy the list of configured plugins
            configured = [...Object.keys(config?.plugins ?? {})].filter((k) => k !== '@');
        // go through each expected plugin
        plugins.forEach((plugin) => {
            const index = configured.findIndex((id) => (id === plugin));
            if (index >= 0) {
                // plugin was found, remove it from the `configured` array
                const [match] = configured.splice(index, 1);
                matched.push(match);
            } else {
                // expected plugin was not found
                unMatched.push(plugin);
            }
        });
        const pass = unMatched.length === 0 && configured.length === 0;
        return {
            message: pass
                ? () => 'configured plugins matched expected plugins'
                : () => (
                    `configured plugins do not match expected plugins:\n${
                        plugins.map((p) => (
                            matched.includes(p) ? chalk.green(`   ${p}`) : chalk.red(` - ${p}`)
                        )).join('\n')
                    }${chalk.yellow(configured.map((p) => `\n + ${p}`).join(''))}`
                ),
            pass,
        };
    },

    toConfigureNoUnknownPluginRules(config, plugin) {
        const pluginModule = config.plugins[plugin],
            // transform rules object into a list of deprecated rules
            pluginRules = Object.keys(pluginModule.rules).map((id) => `${plugin}/${id}`),
            // get list of unknown configured rules for this plugin
            unknownRules = Object.keys(config.rules)
                .filter((name) => (name.startsWith(`${plugin}/`) && !pluginRules.includes(name)));
        return {
            message: unknownRules.length > 0 ? () => (
                `The following rules configured for ${plugin} are not defined by the plugin:\n${
                    unknownRules.map((id) => `\n * '${id}'`).join('')
                }`
            ) : () => `All rules configured for ${plugin} are defined by the plugin`,
            pass: unknownRules.length === 0,
        };
    },

    toEnableNoDeprecatedPluginRules(config, plugin) {
        const pluginModule = config.plugins[plugin],
            // transform rules object into a list of deprecated rules
            deprecatedPluginRules = Object.entries(pluginModule.rules)
                .filter(([, { meta }]) => meta.deprecated)
                .map(([id]) => `${plugin}/${id}`),
            // get list of enabled plugin rules that are deprecated
            deprecated = Object.entries(config.rules).filter(([id, conf]) => {
                if (!id.startsWith(`${plugin}/`)) return false;
                if (!deprecatedPluginRules.includes(id)) return false;
                // determine rule config level
                let level = conf;
                if (Array.isArray(level)) [level] = level;
                // deprecated rules are fine if they are turned off
                return !(level === 'off' || level === 0);
            }).map(([id]) => id);

        return {
            message: deprecated.length > 0 ? () => (
                `The following rules configured for ${plugin} are deprecated:\n${
                    deprecated.map((id) => `\n * '${id}'`).join('')
                }`
            ) : () => `This config defines no deprecated rules for ${plugin}`,
            pass: deprecated.length === 0,
        };
    },

    toConfigureAllPluginRules(config, plugin, exeptions = []) {
        let { rules: pluginRules } = config.plugins[plugin];
        // transform rules object into a list of all non-deprecated rules
        pluginRules = Object.entries(pluginRules)
            .filter(([id, { meta }]) => (!meta.deprecated && !exeptions.includes(id)))
            .map(([id]) => `${plugin}/${id}`);
        // create a list of unconfigured plugin rules
        const unconfigured = pluginRules.filter((id) => !Object.hasOwn(config.rules, id));
        return {
            message: unconfigured.length > 0 ? () => (
                `The following rules for ${plugin} have not been configured:\n${
                    unconfigured.map((id) => `\n * '${id}'`).join('')
                }`
            ) : () => `All rules for ${plugin} have been configured`,
            pass: unconfigured.length === 0,
        };
    },
});