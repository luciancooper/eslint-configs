const globals = require('globals');

exports.node = {
    cjs: {
        name: 'lcooper/envs/node-cjs',
        languageOptions: {
            sourceType: 'commonjs',
            globals: {
                ...globals.nodeBuiltin,
                __dirname: 'readonly',
                __filename: 'readonly',
            },
        },
    },
    esm: {
        name: 'lcooper/envs/node-esm',
        languageOptions: {
            sourceType: 'module',
            globals: {
                ...globals.nodeBuiltin,
            },
        },
        rules: {
            // always extensions in esm node
            'import/extensions': [2, 'ignorePackages'],
        },
    },
};

exports.browser = {
    name: 'lcooper/envs/browser',
    languageOptions: {
        globals: {
            ...globals.browser,
        },
    },
};

exports.globals = globals;