# Test Structure


```js
describe('makePoniesPink', () => {
  beforeAll(() => {
    /* Runs before all tests */
  })
  afterAll(() => {
    /* Runs after all tests */
  })
  beforeEach(() => {
    /* Runs before each test */
  })
  afterEach(() => {
    /* Runs after each test */
  })

  test('make each pony pink', () => {
    const actual = fn(['Alice', 'Bob', 'Eve'])
    expect(actual).toEqual(['Pink Alice', 'Pink Bob', 'Pink Eve'])
  })
})
```
Test strucure is straight forward.
- Define a `describe` and pass `'name of the suite'` as first parameter and pass a callback as second parameter.
- Define `hooks` if needed. (`hooks` can be `beforeAll`, `afterAll`, `beforeEach` and `aferEach`.)
- Define `test` block and write test accordingly. You can then add as many `test` blocks as needed.