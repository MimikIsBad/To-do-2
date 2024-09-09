// eslint.config.js

module.exports = {
  // Define the environment
  env: {
    browser: true,
    es2021: true,
  },
  // Specify the parser
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  // Add the custom rules
  rules: {
    quotes: ["error", "single"], // Enforce single quotes
    semi: ["error", "always"], // Enforce semicolons
    "no-unused-vars": ["error", { args: "none" }], // Ignore unused arguments
    indent: ["error", 2], // Enforce 2-space indentation
    "no-console": ["warn", { allow: ["warn", "error"] }], // Allow console.warn and console.error
    "prefer-arrow-callback": ["error", { allowNamedFunctions: false }], // Enforce arrow functions for anonymous functions
    "consistent-return": "error", // Enforce consistent return
    "no-multiple-empty-lines": ["error", { max: 1, maxBOF: 0, maxEOF: 0 }], // Allow at most 1 empty line
    "quote-props": ["error", "as-needed"], // Quote object keys only when necessary
    "no-mixed-spaces-and-tabs": ["error"], // Disallow mixed spaces and tabs
    "no-trailing-spaces": ["error"], // Disallow trailing spaces
    "max-len": ["error", { code: 80 }], // Enforce a maximum line length of 80 characters
  },
};
