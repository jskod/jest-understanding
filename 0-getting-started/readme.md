# Getting Started

Let's get started by writing a test for the following function inside `sum.js` file.

```js
function sum(a, b) {
  return a + b;
}
module.exports = sum;
```

Create a file named `sum.test.js` and write actual code for testing.

```js
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

Add `test` script in `package.json` file.

```json
{
  "scripts": {
    "test" : "jest"
  }
}
```

Now, run test with `yarn test` or `npm test`.

```
PASS  getting-started/sum.test.js
√ adds 1 + 2 to equal 3 (10ms)
```

You will notice that test runs and outputs some results.



