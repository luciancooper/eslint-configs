/**
 * @file
 * A rule to suggest using template literals instead of string concatenation
 * Based on Eslint's `prefer-template` rule (original author Toru Nagashima)
 * @author Lucian Cooper <cooperlucian@gmail.com>
 */

const docsUrl = require('./utils/docs-url');

/**
 * Checks whether or not a given node is a string literal.
 * @param {ASTNode} node - A node to check.
 * @returns {boolean} - `true` if the node is a string literal.
 */
function isStringLiteral(node) {
    return ((node.type === 'Literal' && typeof node.value === 'string') || node.type === 'TemplateLiteral');
}

/**
 * Checks whether or not a given node is a concatenation.
 * @param {ASTNode} node - A node to check.
 * @returns {boolean} - `true` if the node is a concatenation.
 */
function isConcatenation(node) {
    return node.type === 'BinaryExpression' && node.operator === '+';
}

/**
 * Returns the string / non string literal mixture type of a given node, which can be one of:
 * `1` - contains only string literals
 * `2` - contains only non-string literals
 * `3` - contains a mixture of string & non-string literals
 * @param {ASTNode} node - Node to evaluate
 * @returns {number} - The mixture type of the expression
 */
function literalMixtureType(node) {
    return isConcatenation(node)
        ? (literalMixtureType(node.left) | literalMixtureType(node.right))
        : isStringLiteral(node) ? 1 : 2;
}

/**
 * Flattens a binary expression into an array of component nodes.
 * @param {ASTNode} node - Node to flatten
 * @returns {ASTNode[]} - Array of component nodes
 */
function flattenBinaryConcatExpression(node) {
    if (!isConcatenation(node)) return [node];
    const type = literalMixtureType(node);
    return type === 3
        ? [...flattenBinaryConcatExpression(node.left), ...flattenBinaryConcatExpression(node.right)]
        : [node];
}

/**
 * Count how many binary concat expressions are within a given node
 * @param {ASTNode} node - Node to evaluate
 * @returns {number} - The number of component nodes
 */
function countBinaryConcatNodes(node) {
    if (!isConcatenation(node)) return 1;
    const type = literalMixtureType(node);
    return type === 3 ? countBinaryConcatNodes(node.left) + countBinaryConcatNodes(node.right) : 1;
}

/**
 * Checks whether or not a node contains a string literal with an octal or non-octal decimal escape sequence
 * @param {ASTNode} node - Node to check
 * @returns {boolean} - `true` if at least one string literal within the node contains
 * an octal or non-octal decimal escape sequence
 */
function hasOctalOrNonOctalDecimalEscapeSequence(node) {
    if (isConcatenation(node)) {
        return hasOctalOrNonOctalDecimalEscapeSequence(node.left)
            || hasOctalOrNonOctalDecimalEscapeSequence(node.right);
    }
    // No need to check TemplateLiterals – would throw parsing error
    return (node.type === 'Literal' && typeof node.value === 'string')
        ? /^(?:[^\\]|\\.)*\\(?:[1-9]|0[0-9])/su.test(node.raw)
        : false;
}

/**
 * Determines whether a given node will start with a template curly
 * expression (`${}`) when being converted to a template literal.
 * @param {ASTNode} node - The node that will be fixed to a template literal
 * @returns {boolean} - `true` if the node will start with a template curly.
 */
function startsWithTemplateCurly(node) {
    if (node.type === 'BinaryExpression') {
        return startsWithTemplateCurly(node.left);
    }
    if (node.type === 'TemplateLiteral') {
        if (!node.expressions.length) return false;
        const { quasis } = node;
        return quasis.length && quasis[0].range[0] === quasis[0].range[1];
    }
    return node.type !== 'Literal' || typeof node.value !== 'string';
}

/**
 * Determines whether a given node end with a template curly
 * expression (`${}`) when being converted to a template literal.
 * @param {ASTNode} node - The node that will be fixed to a template literal
 * @returns {boolean} - `true` if the node will end with a template curly.
 */
function endsWithTemplateCurly(node) {
    if (node.type === 'BinaryExpression') {
        return startsWithTemplateCurly(node.right);
    }
    if (node.type === 'TemplateLiteral') {
        if (!node.expressions.length) return false;
        const { quasis } = node;
        return quasis.length && quasis[quasis.length - 1].range[0] === quasis[quasis.length - 1].range[1];
    }
    return node.type !== 'Literal' || typeof node.value !== 'string';
}

/**
 * Gets the non-token text between two nodes, ignoring any other tokens that appear between the two tokens.
 * @param {SourceCode} sourceCode - source code instance
 * @param {ASTNode} node1 - The first node
 * @param {ASTNode} node2 - The second node
 * @returns {string} - The text between the nodes, excluding other tokens
 */
function getTextBetween(sourceCode, node1, node2) {
    const allTokens = [node1].concat(sourceCode.getTokensBetween(node1, node2)).concat(node2),
        sourceText = sourceCode.getText();

    return allTokens.slice(0, -1).reduce((acc, token, index) => (
        acc + sourceText.slice(token.range[1], allTokens[index + 1].range[0])
    ), '');
}

/**
 * Returns the template literal form of an array of binary concatenation expression nodes.
 * @param {SourceCode} sourceCode - Source code instance
 * @param {ASTNode[]} nodes - Binary concatenation expression nodes to convert to a template literal
 * @returns {string} - The array of nodes as a template literal
 */
function toTemplateLiteral(sourceCode, nodes) {
    const stringForm = nodes.map((node) => {
        if (!(node.type === 'Literal' && typeof node.value === 'string')) {
            return sourceCode.getText(node);
        }
        // If the current node is a string literal, escape any instances of ${ or ` to prevent them from being
        // interpreted as a template placeholder. However, if the code already contains a backslash before
        // the ${ or ` for some reason, don't add another backslash, because that would change the meaning of
        // the code (it would cause an actual backslash character to appear before the dollar sign).
        return `\`${node.raw.slice(1, -1).replace(/\\*(\$\{|`)/gu, (matched) => {
            if (matched.lastIndexOf('\\') % 2) {
                return `\\${matched}`;
            }
            return matched;
            // Unescape any quotes that appear in the original Literal that no longer need to be escaped.
        }).replace(new RegExp(`\\\\${node.raw[0]}`, 'gu'), node.raw[0])}\``;
    });
    let template = '',
        textBeforeNode = null,
        textAfterNode = null,
        nextSlice = 0;
    for (let i = 0, n = nodes.length; i < n - 1; i += 1) {
        const left = nodes[i],
            right = nodes[i + 1],
            plusSign = sourceCode.getFirstTokenBetween(left, right, (token) => token.value === '+'),
            beforePlus = getTextBetween(sourceCode, left, plusSign),
            afterPlus = getTextBetween(sourceCode, plusSign, right);
        // If the left side of the expression ends with a template curly add extra text to the end of the curly bracket.
        if (endsWithTemplateCurly(left)) {
            // `foo${bar}` /* comment */ + 'baz' --> `foo${bar /* comment */  }${baz}`
            let str = stringForm[i];
            if (!isStringLiteral(left)) {
                str = `\`\${${textBeforeNode || ''}${str}${beforePlus + afterPlus}}\``;
            }
            template += str.slice(nextSlice, -1);
            textBeforeNode = null;
            nextSlice = 1;
            continue;
        }
        // Check if the right side of the expression starts with a template curly
        if (startsWithTemplateCurly(right)) {
            // 'foo' /* comment */ + `${bar}baz` --> `foo${ /* comment */  bar}baz`
            let str = stringForm[i];
            if (!isStringLiteral(left)) {
                str = `\`\${${textBeforeNode || ''}${str}}\``;
            }
            template += str.slice(nextSlice, -1);
            textBeforeNode = beforePlus + afterPlus;
            nextSlice = 1;
            continue;
        }
        // Otherwise, these nodes should not be combined into a template curly, since there is nowhere to put the
        // text between them.
        let str = stringForm[i];
        if (!isStringLiteral(left)) {
            str = `\`\${${textBeforeNode || ''}${str}}\``;
        }
        template += str.slice(nextSlice);
        template += `${beforePlus}+${afterPlus}`;
        textBeforeNode = textAfterNode;
        textAfterNode = null;
        nextSlice = 0;
    }
    const last = nodes[nodes.length - 1];
    let str = stringForm[nodes.length - 1];
    if (!isStringLiteral(last)) {
        str = `\`\${${textBeforeNode || ''}${str}${textAfterNode || ''}}\``;
    }
    template += str.slice(nextSlice);
    return template;
}

/**
 * Returns a fixer function that converts an array of mixed literals into a template literal
 * @param {SourceCode} sourceCode - Source code instance
 * @param {ASTNode[]} nodes - Component nodes that should be converted to a template literal
 * @param {Location[]} loc - start and end locations of the text range to replace
 * @returns {Function|null} - The fixer function
 */
function mixedConcatenationFixer(sourceCode, nodes, [start, end]) {
    // check whether or not any node is a string literal with an octal or non-octal decimal escape sequence
    if (nodes.some((node) => hasOctalOrNonOctalDecimalEscapeSequence(node))) {
        return null;
    }
    return (fixer) => fixer.replaceTextRange(
        [sourceCode.getIndexFromLoc(start), sourceCode.getIndexFromLoc(end)],
        toTemplateLiteral(sourceCode, nodes),
    );
}

module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'require template literals instead of string concatenation',
            category: 'ECMAScript 6',
            recommended: false,
            url: docsUrl('prefer-template'),
        },
        schema: [],
        fixable: 'code',
        messages: {
            unexpectedStringConcatenation: 'Unexpected string concatenation.',
        },
    },
    create(context) {
        const sourceCode = context.getSourceCode();
        let checked = Object.create(null);

        /**
         * Reports if a given node is string concatenation with non string literals.
         * @param {ASTNode} node - A node to check.
         * @returns {void}
         */
        const checkNode = (node) => {
            if (!isStringLiteral(node) || !isConcatenation(node.parent)) return;
            // get the top most `+` expression node
            let top = node.parent;
            while (isConcatenation(top.parent)) top = top.parent;
            // stop if this binary expression tree has already been checked.
            if (checked[top.range[0]]) return;
            // mark this top level node as checked
            checked[top.range[0]] = true;
            // flatten binary concat expression
            const nodes = flattenBinaryConcatExpression(top);
            // group adjacent nodes by line
            for (let i = 0, j = 1, n = nodes.length; j < n; i = j, j = i + 1) {
                // find span of adjacent nodes that are on the same line
                for (; j < n && nodes[j - 1].loc.end.line === nodes[j].loc.start.line; j += 1);
                // continue if this node is the only one on its line
                const count = j - i;
                if (count === 1) continue;
                // determine if node span has a mixture of string and non-string literals
                let type = 0;
                for (let x = i; x < j; x += 1) {
                    type |= literalMixtureType(nodes[x]);
                    if (type === 3) break;
                }
                // continue if node span does not have a mixture of string and non-string literals
                if (type !== 3) continue;
                // find start location of this span of nodes
                let start,
                    first = nodes[i];
                for (let x = 1; x < count; x += countBinaryConcatNodes(first.right)) {
                    if (first.parent.right === first) {
                        const plus = sourceCode.getFirstTokenBetween(first.parent.left, first, (t) => t.value === '+');
                        ({ start } = sourceCode.getTokenAfter(plus).loc);
                        break;
                    }
                    first = first.parent;
                }
                if (!start) ({ start } = first.loc);
                // find end location of this span of nodes
                let end,
                    last = nodes[j - 1];
                for (let x = 1; x < count; x += countBinaryConcatNodes(last.left)) {
                    if (last.parent.left === last) {
                        const plus = sourceCode.getFirstTokenBetween(last, last.parent.right, (t) => t.value === '+');
                        ({ end } = sourceCode.getTokenBefore(plus).loc);
                        break;
                    }
                    last = last.parent;
                }
                if (!end) ({ end } = last.loc);
                // report error
                context.report({
                    loc: { start, end },
                    messageId: 'unexpectedStringConcatenation',
                    fix: mixedConcatenationFixer(sourceCode, nodes.slice(i, j), [start, end]),
                });
            }
        };

        return {
            Program() {
                checked = Object.create(null);
            },
            Literal: checkNode,
            TemplateLiteral: checkNode,
        };
    },
};