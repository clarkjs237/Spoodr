module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "plugin:react/recommended",
        "airbnb"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "semi":"error",
        "no-unused-vars": "off",
        "func-names":"off",
        "indent":"off",
        "no-else-return":"off",
        "prefer-arrow-callback":"off",
        "no-undef":"off",
        "no-use-before-define":"off",
        "comma-dangle":"off",
        "eol-last":"off",
        "no-trailing-spaces":"off",
        "linebreak-style":"off",
        "no-console":"off",
        "no-restricted-globals":"off",
        "object-shorthand":"off",
        "no-shadow":"off",
        "no-debugger":"off",
        "prefer-const":"off",
        "no-multiple-empty-lines":"off"
    }
};