const docsUrl = require('./utils/docs-url');

const UNACCEPTABLE_PARENTS = [
    'ArrowFunctionExpression',
    'BlockStatement',
    'ClassBody',
    'DoWhileStatement',
    'ForStatement',
    'ForInStatement',
    'ForOfStatement',
    'FunctionDeclaration',
    'FunctionExpression',
    'IfStatement',
    'LabeledStatement',
    'SwitchStatement',
    'WhileStatement',
    'WithStatement',
];

/**
 * Checks if the given identifier node is shadowed in the given scope
 * @param {Object} scope - The current scope
 * @param {ASTNode} node - The identifier node to check
 * @returns {boolean}
 */
function isShadowed(scope, node) {
    const references = scope.references.filter(({ identifier }) => (
        identifier.range[0] === node.range[0] && identifier.range[1] === node.range[1]
    ));
    if (!references.length) return false;
    const [reference] = references;
    return reference.resolved && reference.resolved.defs.length > 0;
}

module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'ensure `require()` calls are in the top-level module scope',
            category: 'Stylistic Issues',
            recommended: false,
            url: docsUrl('global-require'),
        },
        fixable: null,
        schema: [],
        messages: {
            unexpected: 'Unexpected require().',
        },
    },
    create(context) {
        return {
            CallExpression(node) {
                const { sourceCode } = context,
                    currentScope = sourceCode.getScope(node);
                if (node.callee.name !== 'require' || isShadowed(currentScope, node.callee)) {
                    return;
                }
                const ancestors = sourceCode.getAncestors(node),
                    isBadRequire = ancestors.some((parent) => UNACCEPTABLE_PARENTS.includes(parent.type));
                if (isBadRequire) {
                    context.report({
                        node,
                        messageId: 'unexpected',
                    });
                }
            },
        };
    },
};