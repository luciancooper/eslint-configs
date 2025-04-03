const allConfig = require('./configs/all');

const rules = {
    'consecutive-declarations': require('./rules/consecutive-declarations'),
    'global-require': require('./rules/global-require'),
    'prefer-template': require('./rules/prefer-template'),
    'top-level-padding-lines': require('./rules/top-level-padding-lines'),
};

module.exports = {
    configs: {
        all: allConfig,
        'all/flat': {
            name: 'lcooper/plugin/all',
            plugins: { '@lcooper': { rules } },
            rules: allConfig.rules,
        },
    },
    rules,
};