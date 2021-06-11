const STATEMENT_LIST_PARENTS = new Set(['Program', 'BlockStatement', 'SwitchCase']);

/**
 * Determines whether the given node is in a statement list.
 * @param {ASTNode} node - node to check
 * @returns {boolean} - `true` if the given node is in a statement list
 */
function isInStatementList(node) {
    return STATEMENT_LIST_PARENTS.has(node.parent.type);
}

/**
 * Check if a variable declaration is a require.
 * @param {ASTNode} decl - variable declaration Node
 * @returns {bool} - if decl is a require, return true; else return false.
 * @private
 */
function isRequire(decl) {
    return decl.init && decl.init.type === 'CallExpression' && decl.init.callee.name === 'require';
}

/**
 * Count the number of require statements in a group of variable declarators
 * @param {VariableDeclarator[]} declarations - array of variable declarators
 * @returns {number}
 */
function countRequires(declarations) {
    let count = 0;
    for (let i = 0; i < declarations.length; i += 1) {
        if (isRequire(declarations[i])) count += 1;
    }
    return count;
}

/**
 * Returns the line span of a variable declarator node
 * @param {VariableDeclarator} node - variable declarator
 * @returns {number}
 */
function declaratorLineSpan(node) {
    const { init } = node;
    return init ? init.loc.end.line - init.loc.start.line : 0;
}

/**
 * Fixer to split a Block of VariableDeclarations into requires and non requires groups
 * @param {SourceCode} sourceCode
 * @param {VariableDeclaration} node - The `VariableDeclaration` to split
 * @returns {Function|null} - The fixer function
 */
function mixedRequiresFixer(sourceCode, node) {
    const { parent } = node;
    // don't autofix code such as: if (foo) var x, y;
    if (!isInStatementList(parent.type === 'ExportNamedDeclaration' ? parent : node)) {
        return null;
    }
    const declarations = node.declarations.map((declarator) => ({
        declarator,
        blockStart: declarator.range[0],
    }));
    // initialize flag so we can stop this fix if need be
    let autofix = true;
    // process tokens between declarators
    const last = declarations.reduce((prev, next) => {
        const tokens = sourceCode.getTokensBetween(prev.declarator, next.declarator, { includeComments: true }),
            commaIndex = tokens.findIndex(({ type, value }) => type === 'Punctuator' && value === ',');
        if (commaIndex < 0) {
            // no comma found between declarators. code is invalid so don't autofix
            autofix = false;
            return next;
        }
        // get the comma token
        const comma = tokens[commaIndex];
        prev.comma = comma;
        prev.blockEnd = comma.range[0];
        // find any comments after the comma on the same line
        const ln = comma.loc.end.line;
        let ci = commaIndex + 1;
        for (; ci < tokens.length; ci += 1) {
            const token = tokens[ci];
            if ((token.type === 'Line' || token.type === 'Block') && token.loc.end.line === ln) continue;
            break;
        }
        // store the index of any lagging content that should be associated with this declarator
        prev.adjStart = comma.range[1];
        prev.adjEnd = tokens[ci - 1].range[1];
        // determine the starting index of the next block
        if (ci < tokens.length) {
            const nextBlock = tokens[ci];
            next.blockStart = nextBlock.range[0];
        }
        // return the next block (to be used as `prev` in the next iteration)
        return next;
    });
    // if any errors were found processing tokens between declarators, don't autofix
    if (!autofix) return null;
    // get the ending point of the last token
    {
        const afterLast = sourceCode.getTokenAfter(last.declarator, { includeComments: false });
        let adjIndex,
            adjComments,
            lastLn;
        if (afterLast && afterLast.type === 'Punctuator' && afterLast.value === ';') {
            last.blockEnd = afterLast.range[0];
            last.colon = afterLast;
            adjIndex = afterLast.range[1];
            adjComments = sourceCode.getCommentsAfter(afterLast);
            lastLn = afterLast.loc.end.line;
        } else {
            last.blockEnd = last.declarator.range[1];
            adjIndex = last.declarator.range[1];
            adjComments = sourceCode.getCommentsAfter(last.declarator);
            lastLn = last.declarator.loc.end.line;
        }
        last.adjStart = adjIndex;
        for (const comment of adjComments) {
            if (comment.loc.end.line === lastLn) {
                adjIndex = comment.range[1];
            } else break;
        }
        last.adjEnd = adjIndex;
    }
    // sort declarations, putting `requires` calls first
    const order = node.declarations.map((decl, idx) => ({ idx, req: isRequire(decl) }));
    let reqIdx = 0;
    for (let n = order.length, j; reqIdx < n; reqIdx += 1) {
        // if this is a `requires` call, keep going
        if (order[reqIdx].req) continue;
        // find the next declarator that is not a `requires` call
        for (j = reqIdx + 1; j < n && !order[j].req; j += 1);
        // if there are no more `requires` calls, we can stop
        if (j === n) break;
        // j is the index of the next `requires` call, so swap it up to i
        const swap = order[j];
        // shift items up from i to j
        for (let x = j; x > reqIdx; x -= 1) order[x] = order[x - 1];
        order[reqIdx] = swap;
    }
    // determine variable declaration prefix
    const prefix = (node.parent.type === 'ExportNamedDeclaration' ? 'export ' : '') + node.kind,
        spans = order.map(({ idx }) => declaratorLineSpan(declarations[idx].declarator)),
        shouldSplit = spans.slice(0, -1).map((l, i) => (
            i < reqIdx - 1 ? false : i === reqIdx - 1 ? true : (l > 0 || spans[i + 1] > 0)
        ));
    // return fixer function
    return (fixer) => order.reduce((fixes, { idx }, j) => {
        const item = declarations[idx];
        // check if declarator is in its correct place in the order
        if (idx === j) {
            // check if this is a requires statement
            if (j < reqIdx) {
                // if this is the last requires statement, replace the ',' with ';'
                if (j === reqIdx - 1 && item.comma) fixes.push(fixer.replaceText(item.comma, ';'));
            } else {
                // this is not a require statement
                if (shouldSplit[j - 1]) {
                    fixes.push(fixer.insertTextBefore(item.declarator, `${prefix} `));
                }
                if (j < shouldSplit.length && shouldSplit[j] && item.comma) {
                    fixes.push(fixer.replaceText(item.comma, ';'));
                }
            }
            return fixes;
        }
        // declarator is not in its correct place in the order
        const replacing = declarations[j],
            // any comments written above the declarator
            aboveComment = sourceCode.text.slice(item.blockStart, item.declarator.range[0]),
            // the declarator node text
            declaratorText = sourceCode.text.slice(item.declarator.range[0], item.blockEnd);
        // determine text to replace declarator with, as well as the comma to replace if applicable
        let replacement,
            comma = null;
        if (j < reqIdx) {
            // this is a requires statement
            if (j === 0 && aboveComment.length) {
                // insert above comment before `const` keyword
                const typeToken = sourceCode.getTokenBefore(replacing.declarator);
                fixes.push(fixer.insertTextBefore(typeToken, aboveComment));
                // do not include above comment in replacement text
                replacement = declaratorText;
            } else {
                replacement = aboveComment + declaratorText;
            }
            // only replace comma if this is the last requires statement
            if (j === reqIdx - 1) comma = replacing.comma;
        } else {
            // this is not a require statement
            replacement = shouldSplit[j - 1]
                ? `${aboveComment}${prefix} ${declaratorText}`
                : aboveComment + declaratorText;
            // replace comma if there is a split between this declarator and the next one
            if (j < shouldSplit.length && shouldSplit[j]) comma = replacing.comma;
        }
        // replace declarator node
        fixes.push(fixer.replaceTextRange(
            [replacing.blockStart, replacing.blockEnd],
            replacement,
        ));
        // replace comma
        if (comma) fixes.push(fixer.replaceText(comma, ';'));
        // replace any adjacent comments following the final punctuator on the same line
        if (replacing.adjEnd > replacing.adjStart || item.adjEnd > item.adjStart) {
            fixes.push(fixer.replaceTextRange(
                [replacing.adjStart, replacing.adjEnd],
                sourceCode.text.slice(item.adjStart, item.adjEnd),
            ));
        }
        // return accumulated fixes
        return fixes;
    }, []);
}

/**
 * Fixer to split a VariableDeclaration into individual declarations
 * @param {SourceCode} sourceCode
 * @param {VariableDeclaration} node - The `VariableDeclaration` to split
 * @returns {Function|null} - The fixer function
 */
function splitDeclarationsFixer(sourceCode, node) {
    const { parent } = node;
    // don't autofix code such as: if (foo) var x, y;
    if (!isInStatementList(parent.type === 'ExportNamedDeclaration' ? parent : node)) {
        return null;
    }
    const prefix = (node.parent.type === 'ExportNamedDeclaration' ? 'export ' : '') + node.kind,
        spans = node.declarations.map(declaratorLineSpan),
        shouldSplit = spans.slice(0, -1).map((l, i) => l > 0 || spans[i + 1] > 0);
    // return fixer function
    return (fixer) => node.declarations.reduce((fixes, declarator, i, declarations) => {
        if (i > 0 && shouldSplit[i - 1]) {
            fixes.push(fixer.insertTextBefore(declarator, `${prefix} `));
        }
        if (i < declarations.length - 1 && shouldSplit[i]) {
            const comma = sourceCode.getTokenAfter(declarator);
            if (comma && comma.type === 'Punctuator' && comma.value === ',') {
                fixes.push(fixer.replaceText(comma, ';'));
            }
        }
        return fixes;
    }, []);
}

/**
 * Fixer to join two VariableDeclarations
 * @param {SourceCode} sourceCode
 * @param {VariableDeclaration} node - The `VariableDeclaration` to join
 * @returns {Function} - The fixer function
 */
function joinDeclarationsFixer(sourceCode, node) {
    return (fixer) => {
        const type = sourceCode.getTokenBefore(node.declarations[0]),
            semi = sourceCode.getTokenBefore(type);
        return [
            (semi.type === 'Punctuator' && semi.value === ';')
                ? fixer.replaceText(semi, ',')
                : fixer.insertTextAfter(semi, ','),
            fixer.replaceText(type, ''),
        ];
    };
}

module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'enforce a consistent style for consecutive variable declarations',
            category: 'Stylistic Issues',
            recommended: false,
            url: 'https://github.com/luciancooper/eslint-configs/tree/main/packages/eslint-plugin/docs/rules/consecutive-declarations.md',
        },
        fixable: 'code',
        schema: [],
        messages: {
            mixedRequires: 'Separate requires statements from other declarations.',
            combine: "Combine this with the previous '{{kind}}' statement.",
            split: "Split multiline '{{kind}}' declarations into multiple statements.",
        },
    },

    create(context) {
        const sourceCode = context.getSourceCode();
        let level = 0;

        function incLevel() {
            level += 1;
        }

        function decLevel() {
            level -= 1;
        }

        return {
            FunctionDeclaration: incLevel,
            'FunctionDeclaration:exit': decLevel,
            FunctionExpression: incLevel,
            'FunctionExpression:exit': decLevel,
            ArrowFunctionExpression: incLevel,
            'ArrowFunctionExpression:exit': decLevel,
            BlockStatement: incLevel,
            'BlockStatement:exit': decLevel,
            ForStatement: incLevel,
            'ForStatement:exit': decLevel,
            ForInStatement: incLevel,
            'ForInStatement:exit': decLevel,
            ForOfStatement: incLevel,
            'ForOfStatement:exit': decLevel,
            SwitchStatement: incLevel,
            'SwitchStatement:exit': decLevel,

            VariableDeclaration(node) {
                const { parent, kind } = node;
                if (!['var', 'let', 'const'].includes(kind)) return;

                const { declarations } = node,
                    req = countRequires(declarations),
                    nodeIndex = (parent.body && parent.body.length > 0 && parent.body.indexOf(node)) || 0;
                // combine consective declarations
                if (nodeIndex > 0) {
                    const previousNode = parent.body[nodeIndex - 1];
                    if (previousNode.type === 'VariableDeclaration' && previousNode.kind === kind) {
                        let shouldCombine = true;
                        if (level === 0 && kind === 'const') {
                            // combine only if both variable declarations are all `requires` call expressions
                            const combDec = declarations.concat(previousNode.declarations || []),
                                combReq = countRequires(combDec);
                            if (combReq === 0) {
                                shouldCombine = combDec.map(declaratorLineSpan).every((l) => l === 0);
                            } else {
                                shouldCombine = (combReq === combDec.length);
                            }
                        }
                        if (shouldCombine) {
                            context.report({
                                node,
                                messageId: 'combine',
                                data: { kind },
                                fix: joinDeclarationsFixer(sourceCode, node),
                            });
                        }
                    }
                }
                // stop if outside the global scope or declaration kind is not `const`
                if (level > 0 || kind !== 'const') return;
                // cannot split a single declarator
                if (declarations.length === 1) return;
                // do not split variable declarations within the intialization of a for loop
                if (parent.type === 'ForStatement' && parent.init === node) return;

                // check if any declarators are `require` calls
                if (req > 0) {
                    if (req < declarations.length) {
                        // split mixed requires
                        context.report({
                            node,
                            messageId: 'mixedRequires',
                            fix: mixedRequiresFixer(sourceCode, node),
                        });
                    }
                    return;
                }
                // split top level multi-line const declarators
                const hasMultiline = declarations.map(declaratorLineSpan).some((v, i, spans) => (
                    i < spans.length - 1 && (v > 0 || spans[i + 1] > 0)
                ));
                if (hasMultiline) {
                    context.report({
                        node,
                        messageId: 'split',
                        data: { kind },
                        fix: splitDeclarationsFixer(sourceCode, node),
                    });
                }
            },
        };
    },
};