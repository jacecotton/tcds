# TCDS Code Style Guide

This document outlines code style rules that cannot be automatically enforced by Prettier or ESLint.

## Logical Operators and Line Breaks

When breaking logical expressions across multiple lines, place the operator at the **start** of the continuation line:

```javascript
// ✅ Correct
const someCond = test || test2 || (test3 && test4);

// ❌ Incorrect
const someCond = test || test2 || (test3 && test4);
```

**Note:** This is enforced by ESLint's `operator-linebreak: ["error", "before"]` rule.

## Ternary Operations

When ternary operations exceed 120 columns, break and indent them:

```javascript
// ✅ Correct
const someTern = test ? "hello" : "hola";

// ✅ Also acceptable for short ternaries
const shortTern = test ? "hello" : "hola";

// ❌ Incorrect (exceeds 120 cols without breaking)
const someTern = veryLongConditionThatExceedsOneHundredTwentyColumns ? "hello" : "hola";
```

**Note:** Prettier will automatically format ternaries, but you should manually review for readability.

## Arrow Function Parentheses

Use parentheses around arrow function parameters only when:

- There are **2 or more parameters**
- The function body uses **braces** (block statement)
- Parentheses are **syntactically required** (e.g., destructuring, default values)

```javascript
// ✅ Correct - single parameter, no braces
arr.map(item => item * 2);

// ✅ Correct - multiple parameters
arr.map((item, index) => item * index);

// ✅ Correct - block body requires parentheses
someLongFuncWithCallback((arg1, arg2) => {
  console.log("Line break = braces!");
});

// ✅ Correct - destructuring requires parentheses
arr.map(({name, value}) => name + value);

// ❌ Incorrect - unnecessary parentheses
arr.map(item => item * 2);
```

**Note:** This is enforced by ESLint's `arrow-parens: ["error", "as-needed", {"requireForBlockBody": true}]` rule.

## String Quotes

Prefer **double quotes** for strings. Use **template literals** (backticks) when:

- Interpolating variables
- Multi-line strings are needed
- Avoiding escaped quotes inside strings

```javascript
// ✅ Correct - double quotes
const greeting = "Hello, world!";

// ✅ Correct - template literal for interpolation
const greeting = `Hello, ${name}!`;

// ✅ Correct - single quotes inside double quotes
const message = "foo 'bar'";

// ✅ Correct - template literal avoids escaping
const message = `foo "bar" and 'baz'`;

// ❌ Incorrect - escaped quotes when template literal would be cleaner
const message = "foo \"bar\" and 'baz'";
```

**Note:** ESLint enforces double quotes with `quotes: ["error", "double", {"avoidEscape": true, "allowTemplateLiterals": true}]`.

## Comments

- **Code wrap:** 120 columns
- **Comment wrap:** 80 columns

```javascript
// ✅ Correct - comment wraps at 80 cols
// This is a long comment that explains something important about the code
// below. It wraps at 80 columns to maintain readability.
const someVeryLongVariableNameThatMightExceedEightyColumnsButIsStillValidCodeUpToOneHundredTwenty = true;

// ❌ Incorrect - comment exceeds 80 cols
// This is a long comment that explains something important about the code below and it exceeds eighty columns.
```

**Note:** ESLint warns about this with `max-len: ["warn", {"code": 120, "comments": 80}]`.

## Indentation and Spacing

- **Indentation:** 2 spaces (no tabs)
- **Object/Array spacing:** No spaces inside braces/brackets

```javascript
// ✅ Correct
import {module} from "package";
const obj = {key: "value"};
const arr = [1, 2, 3];
someFunc(({destructParam}) => true);

// ❌ Incorrect
import {module} from "package";
const obj = {key: "value"};
const arr = [1, 2, 3];
someFunc(({destructParam}) => true);
```

**Note:** Enforced by Prettier's `bracketSpacing: false` and ESLint's `object-curly-spacing` and `array-bracket-spacing` rules.

## Trailing Commas and Semicolons

- **Trailing commas:** Required in multi-line structures
- **Semicolons:** Required (always use semicolons)

```javascript
// ✅ Correct
const obj = {
  foo: "bar",
  baz: "qux",
};

const arr = [1, 2, 3];

function example(param1, param2) {
  return param1 + param2;
}

// ❌ Incorrect - missing trailing comma
const obj = {
  foo: "bar",
  baz: "qux",
};

// ❌ Incorrect - missing semicolon
const x = 5;
```

**Note:** Enforced by Prettier's `trailingComma: "all"` and `semi: true`, and ESLint's `semi: ["error", "always"]` and `comma-dangle: ["error", "always-multiline"]`.

## Nunjucks/Twig

- **Filter Pipes:** Do not add spaces around filter pipes.

```twig
{# ✅ Correct #}
{{ value|filter }}
{{ value|filter1|filter2 }}

{# ❌ Incorrect #}
{{ value | filter }}
{{ value | filter1 | filter2 }}
```

---

## Quick Reference

| Rule                    | Tool            | Config                         |
| ----------------------- | --------------- | ------------------------------ |
| 2-space indent          | Prettier        | `tabWidth: 2`                  |
| Double quotes           | Prettier        | `singleQuote: false`           |
| No bracket spacing      | Prettier        | `bracketSpacing: false`        |
| Code wrap 120 cols      | ESLint          | `max-len: {"code": 120}`       |
| Comment wrap 80 cols    | ESLint          | `max-len: {"comments": 80}`    |
| Operators at line start | ESLint          | `operator-linebreak: "before"` |
| Arrow parens as-needed  | Prettier        | `arrowParens: "avoid"`         |
| Trailing commas         | Prettier        | `trailingComma: "all"`         |
| Semicolons required     | Prettier/ESLint | `semi: true`                   |

---

## Running Formatters

```bash
# Format all files
npm run format

# Check formatting without modifying
npm run format:check

# Lint JavaScript files
npm run lint

# Lint and auto-fix
npm run lint:fix
```
