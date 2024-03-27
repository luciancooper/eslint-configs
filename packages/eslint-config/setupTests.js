const { builtinRules } = require('eslint/use-at-your-own-risk');

expect.extend({
    toConfigureNoUnknownCoreRules(config) {
        const baseRules = [...builtinRules.keys()],
            // get list of unknown configured core rules
            unknownRules = Object.keys(config.rules)
                .filter((name) => (!name.includes('/') && !baseRules.includes(name)));
        return {
            message: unknownRules.length > 0 ? () => (
                `The following configured core rules are not defined by eslint:\n${
                    unknownRules.map((id) => `\n * '${id}'`).join('')
                }`
            ) : () => 'All configured core eslint rules are defined',
            pass: unknownRules.length === 0,
        };
    },

    toEnableNoDeprecatedCoreRules(config) {
        // get a list of core deprecated rules
        const deprecatedRules = [];
        for (const [id, { meta }] of builtinRules.entries()) {
            if (meta.deprecated) deprecatedRules.push(id);
        }
        // get list of enabled core rules that are deprecated
        const deprecated = Object.entries(config.rules).filter(([id, conf]) => {
            if (id.includes('/')) return false;
            if (!deprecatedRules.includes(id)) return false;
            // determine rule config level
            let level = conf;
            if (Array.isArray(level)) [level] = level;
            // deprecated rules are fine if they are turned off
            return !(level === 'off' || level === 0);
        }).map(([id]) => id);
        return {
            message: deprecated.length > 0 ? () => (
                `The following configured core eslint rules are deprecated:\n${
                    deprecated.map((id) => `\n * '${id}'`).join('')
                }`
            ) : () => 'This config defines no deprecated core eslint rules',
            pass: deprecated.length === 0,
        };
    },

    toConfigureAllCoreRules(config) {
        // get list of core rules that are not deprecated
        const coreRules = [];
        for (const [id, { meta }] of builtinRules.entries()) {
            if (!meta.deprecated) coreRules.push(id);
        }
        // create a list of unconfigured core rules
        const unconfigured = coreRules.filter((id) => !Object.hasOwn(config.rules, id));
        return {
            message: unconfigured.length > 0 ? () => (
                `The following core eslint rules have not been configured:\n${
                    unconfigured.map((id) => `\n * '${id}'`).join('')
                }`
            ) : () => 'All core eslint rules have been configured',
            pass: unconfigured.length === 0,
        };
    },
});