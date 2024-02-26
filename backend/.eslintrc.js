module.exports = {
    "env": {
        "browser": false,
        "es2021": true
    },
    "extends": "standard-with-typescript",
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "@typescript-eslint/explicit-function-return-type": "off"
        "@typescript-eslint/no-misused-promises": "off"
    }
}
