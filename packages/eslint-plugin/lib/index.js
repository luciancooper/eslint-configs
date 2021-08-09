module.exports = {
    configs: {
        all: require('./configs/all'),
    },
    rules: {
        'consecutive-declarations': require('./rules/consecutive-declarations'),
        'global-require': require('./rules/global-require'),
        'prefer-template': require('./rules/prefer-template'),
        'top-level-padding-lines': require('./rules/top-level-padding-lines'),
    },
};