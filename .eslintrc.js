module.exports = {
    'env': {
        'browser': true,
        'es6': true,
        'node': true,
    },
    'extends': [
        'eslint:recommended',
        'google',
        'plugin:eslint-comments/recommended',
        'plugin:unicorn/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        // 'prettier',
        // 'prettier/unicorn',
        // 'plugin:prettier/recommended',
        'plugin:cypress/recommended',
        'plugin:mocha/recommended',
    ],
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly',
    },
    'parserOptions': {
        'ecmaVersion': 2018,
        'sourceType': 'module',
    },
    'plugins': [
        'cypress',
        'eslint-comments',
        'import',
        'mocha',
        'unicorn',
        // 'prettier',
    ],
    'rules': {
        // 'prettier/prettier': 'error',
        // 'space-before-function-paren': ['error', 'never'],
        'import/no-extraneous-dependencies': [
            'error',
            {
                'devDependencies': true,
            },
        ],
        'indent': ['error', 4],
        'require-jsdoc': [
            'error',
            {
                'require': {
                    'FunctionDeclaration': false,
                    'MethodDefinition': false,
                    'ClassDeclaration': false,
                    'ArrowFunctionExpression': false,
                    'FunctionExpression': false,
                },
            },
        ],
    },
    'settings': {},
};
