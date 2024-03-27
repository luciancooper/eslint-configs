function ruleLevel(config, ruleId) {
    if (!Object.hasOwn(config.rules, ruleId)) return 0;
    const { [ruleId]: rprop } = config.rules;
    let lvl;
    if (!Array.isArray(rprop)) lvl = rprop;
    else [lvl] = rprop;
    return (typeof lvl === 'string')
        ? (lvl === 'error' ? 2 : lvl === 'warn' ? 1 : 0)
        : typeof lvl === 'number' ? lvl : 0;
}

expect.extend({
    toHaveDisabledAssociatedBaseRules(config, pluginRules) {
        const enabledRules = pluginRules.filter(({ id }) => ruleLevel(config, id) > 0);
        if (!enabledRules.length) {
            return { message: () => 'No extension rules are enabled', pass: true };
        }
        const enabledBases = enabledRules.filter(({ baseRule }) => ruleLevel(config, baseRule) > 0);
        return {
            message: enabledBases.length > 0 ? () => (
                `The base rules for these extension rules have not been properly disabled:${
                    enabledBases.map(({ id, baseRule }) => `\n * '${id}' => '${baseRule}'`).join('')
                }`
            ) : () => 'All base rules are disabled',
            pass: enabledBases.length === 0,
        };
    },

    toHaveDisabledRules(config, ruleIds) {
        const enabled = ruleIds.filter((id) => ruleLevel(config, id) > 0);
        return {
            message: enabled.length > 0 ? () => (
                `The following rules are enabled: ${
                    enabled.map((id) => `\n * \x1b[33m${id}\x1b[39m`).join('')
                }`
            ) : () => 'All rules are disabled',
            pass: enabled.length === 0,
        };
    },
});