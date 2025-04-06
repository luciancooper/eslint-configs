import type { ESLint, Linter, Rule } from 'eslint';

declare const plugin: ESLint.Plugin & {
    configs: {
        all: Linter.LegacyConfig
        'all/flat': Linter.Config
    }
    rules: Record<string, Rule.RuleModule>
};

export = plugin;