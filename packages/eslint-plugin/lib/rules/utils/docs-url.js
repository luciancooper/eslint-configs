const repoUrl = 'https://github.com/luciancooper/eslint-configs';

module.exports = (ruleName) => (
    `${repoUrl}/blob/main/packages/eslint-plugin/docs/rules/${ruleName}.md`
);