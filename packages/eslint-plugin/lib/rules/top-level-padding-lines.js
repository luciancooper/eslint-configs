const { isRequireStatement } = require('./utils/is-require'),
    docsUrl = require('./utils/docs-url');

/**
 * Returns if an AST node is an es6 import statement
 * @param {ASTNode} node - ast node to check
 * @returns {boolean}
 */
function isImportStatement(node) {
    const { type } = node;
    return (type === 'ImportDeclaration' || type === 'TSImportEqualsDeclaration');
}

/**
 * Determines if there is at least one blank line between two statements
 * @param {ASTNode} current - AST node of the first statement
 * @param {ASTNode} next - AST node of the next statement
 * @param {Token[]} comments - comment tokens between `current` and `next` statements
 * @returns {boolean}
 */
function isBlankLineBetween(current, next, comments) {
    let l = current.loc.end.line;
    for (let i = 0, n = comments.length; i < n; i += 1) {
        const comment = comments[i];
        if (l + 1 < comment.loc.start.line) return true;
        l = comment.loc.end.line;
    }
    return l + 1 < next.loc.start.line;
}

/**
 * Gets the function name of a node if it contains a function declaration.
 * @param {ASTNode} node - AST node.
 * @returns {Object} a `{ name, overload }` object, or `null` if it does not contain a function declaration.
 */
function getFunctionDeclaration(node) {
    if (!node) return null;
    switch (node.type) {
        case 'ExportDefaultDeclaration':
        case 'ExportNamedDeclaration':
            // export statements (e.g. export { a };) have no declarations, so ignore them
            return node.declaration ? getFunctionDeclaration(node.declaration) : null;
        case 'TSDeclareFunction':
        case 'FunctionDeclaration':
            return (node.id && node.id.name)
                ? { name: node.id.name, overload: node.type === 'TSDeclareFunction' }
                : null;
        default: return null;
    }
}

/**
 * Fixer that removes blank lines between two top-level statement nodes
 * @param {SourceCode} sourceCode - source code instance
 * @param {ASTNode} current - AST node of the first statement
 * @param {ASTNode} next - AST node of the next statement
 * @param {Token[]} comments - comment tokens between `current` and `next` statements
 * @returns {Function} fixer function
 */
function removeFixer(sourceCode, current, next, comments) {
    // get blank lines
    const ranges = [];
    let l = current.loc.end.line;
    for (let i = 0, n = comments.length; i < n; i += 1) {
        const comment = comments[i];
        if (l + 1 < comment.loc.start.line) {
            ranges.push([
                sourceCode.getIndexFromLoc({ line: l + 1, column: 0 }),
                sourceCode.getIndexFromLoc({ line: comment.loc.start.line, column: 0 }),
            ]);
        }
        l = comment.loc.end.line;
    }
    if (l + 1 < next.loc.start.line) {
        ranges.push([
            sourceCode.getIndexFromLoc({ line: l + 1, column: 0 }),
            sourceCode.getIndexFromLoc({ line: next.loc.start.line, column: 0 }),
        ]);
    }
    return (fixer) => ranges.map((range) => fixer.replaceTextRange(range, ''));
}

/**
 * Fixer that inserts a blank line after a top level statement node
 * @param {ASTNode} current - AST node of the current statement
 * @param {Token[]} comments - comment tokens following the `current` node
 * @returns {Function} fixer function
 */
function insertFixer(current, comments) {
    const [lastToken = current] = comments
        .filter((c) => c.loc.end.line === current.loc.end.line)
        .slice(-1);
    return (fixer) => fixer.insertTextAfter(lastToken, '\n');
}

module.exports = {
    meta: {
        type: 'layout',
        docs: {
            description: 'require or disallow padding lines between top level statements',
            category: 'Stylistic Issues',
            recommended: false,
            url: docsUrl('top-level-padding-lines'),
        },
        fixable: 'whitespace',
        schema: [{
            enum: ['always', 'never', 'ignore'],
        }, {
            type: 'object',
            properties: {
                betweenSingleLines: {
                    enum: ['always', 'never', 'ignore'],
                },
                betweenImports: {
                    enum: ['always', 'never', 'ignore'],
                },
                betweenOverloads: {
                    enum: ['always', 'never', 'ignore'],
                },
            },
            additionalProperties: false,
        }],
        messages: {
            never: 'Unexpected blank line between top level statements.',
            always: 'Expected blank line between top level statements.',
            neverSingleLines: 'Unexpected blank line between singleline top level statements.',
            alwaysSingleLines: 'Expected blank line between singleline top level statements.',
            neverBetweenImports: 'Unexpected blank line between import statements.',
            alwaysBetweenImports: 'Expected blank line between import statements.',
            neverBetweenOverloads: 'Unexpected blank line between overload signatures.',
            alwayBetweenOverloads: 'Expected blank line between overload signatures.',
        },
    },
    create(context) {
        const { sourceCode } = context,
            baseOption = context.options[0] || 'always',
            { betweenSingleLines, betweenImports, betweenOverloads } = {
                betweenSingleLines: 'never',
                betweenImports: 'never',
                betweenOverloads: 'never',
                ...context.options[1] || {},
            };
        return {
            Program(node) {
                // body must have more than 2 nodes
                if (node.body.length <= 1) return;
                // go through each pair of adjacent body nodes
                node.body.reduce((current, next) => {
                    const currentIsImport = isImportStatement(current),
                        nextIsImport = isImportStatement(next),
                        currentIsRequire = isRequireStatement(current),
                        nextIsRequire = isRequireStatement(next),
                        currentFn = getFunctionDeclaration(current),
                        nextFn = getFunctionDeclaration(next),
                        currentIsSingle = current.loc.start.line === current.loc.end.line,
                        nextIsSingle = next.loc.start.line === next.loc.end.line;
                    // determine option spec and messageId for current context
                    let option = baseOption,
                        messageId = option;
                    if ((currentIsImport && nextIsImport) || (currentIsRequire && nextIsRequire)) {
                        // `current` and `next` are both import/require statements
                        option = betweenImports;
                        messageId = `${option}BetweenImports`;
                    } else if (currentFn && nextFn && currentFn.name === nextFn.name && currentFn.overload) {
                        option = betweenOverloads;
                        messageId = `${option}BetweenOverloads`;
                    } else {
                        const nonImport = !currentIsImport && !nextIsImport && !currentIsRequire && !nextIsRequire;
                        if (nonImport && currentIsSingle && nextIsSingle) {
                            // `current` and `next` are both non-import singleline statements
                            option = betweenSingleLines;
                            messageId = `${option}SingleLines`;
                        }
                    }
                    // if option config is 'ignore', then continue
                    if (option === 'ignore') return next;
                    // get comments between nodes
                    const comments = sourceCode.getCommentsBefore(next),
                        isPadded = isBlankLineBetween(current, next, comments);
                    // check for error
                    if ((option === 'always' && !isPadded) || (option === 'never' && isPadded)) {
                        context.report({
                            loc: {
                                start: current.loc.end,
                                end: next.loc.start,
                            },
                            messageId,
                            fix: isPadded
                                ? removeFixer(sourceCode, current, next, comments)
                                : insertFixer(current, comments),
                        });
                    }
                    return next;
                });
            },
        };
    },
};