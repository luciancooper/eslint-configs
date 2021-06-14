/**
 * Determines if a node is an expression containing a `require` call
 * @param {ASTNode} node - ast node to check
 * @returns {boolean}
 */
function isRequireExpression(node) {
    if (!node) return false;
    // check node type
    switch (node.type) {
        case 'CallExpression':
        case 'NewExpression':
            // check for `require('x')` or `new require('x')`
            if (node.callee.type === 'Identifier') {
                return node.callee.name === 'require';
            }
            // check for `require('x')('y')`, `new require('x')('y')`, or `new (require('x'))`
            if (node.callee.type === 'CallExpression' || node.callee.type === 'NewExpression') {
                return isRequireExpression(node.callee);
            }
            return false;
        case 'MemberExpression':
            // check for `require('x').y`
            return isRequireExpression(node.object);
        case 'AssignmentExpression':
            return isRequireExpression(node.right);
        default:
            return false;
    }
}

/**
 * Check if a variable declarator contains a `require` call
 * @param {VariableDeclarator} decl - variable declaration node
 * @returns {boolean}
 */
function isRequireDeclarator(decl) {
    return decl.init && isRequireExpression(decl.init);
}

/**
 * Check if a statement contains a `require` call
 * @param {ASTNode} node - statement ast node
 * @returns {boolean}
 */
function isRequireStatement(node) {
    switch (node.type) {
        case 'VariableDeclaration':
            return node.declarations.some(isRequireDeclarator);
        case 'ExpressionStatement':
            return isRequireExpression(node.expression);
        default:
            return false;
    }
}

module.exports = {
    isRequireDeclarator,
    isRequireStatement,
};