# Mock Functions 
Mock functions make it easy to test the links between code by:
- erasing the actual implementation of a function
- capturing calls to the function (and the parameters passed in those calls)
- capturing instances of constructor functions when instantiated with `new`
- and allowing test-time configuration of return values.

## using a mock function
Let's imagine we're testing an implementation of a function `forEach`, which invokes a callback for each item in a supplied array.

```js
function forEach(items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}
```

To test this function, we can use a mock function, and inspect the mock's state to ensure the callback is invoked as expected.

```js
const mockCallback = jest.fn(x => 42 + x);
forEach([0, 1], mockCallback);

// The mock function is called twice
expect(mockCallback.mock.calls.length).toBe(2);

// The first argument of the first call to the function was 0
expect(mockCallback.mock.calls[0][0]).toBe(0);

// The first argument of the second call to the function was 1
expect(mockCallback.mock.calls[1][0]).toBe(1);

// The return value of the first call to the function was 42
expect(mockCallback.mock.results[0].value).toBe(42);
```

### .mock property is useful any many ways
`.mock` property can be used to assert how these functions get called, instantiated or what they returned.

```js
// The function was called exactly once
expect(someMockFunction.mock.calls.length).toBe(1);

// The first arg of the first call to the function was 'first arg'
expect(someMockFunction.mock.calls[0][0]).toBe('first arg');

// The second arg of the first call to the function was 'second arg'
expect(someMockFunction.mock.calls[0][1]).toBe('second arg');

// The return value of the first call to the function was 'return value'
expect(someMockFunction.mock.results[0].value).toBe('return value');

// This function was instantiated exactly twice
expect(someMockFunction.mock.instances.length).toBe(2);

// The object returned by the first instantiation of this function
// had a `name` property whose value was set to 'test'
expect(someMockFunction.mock.instances[0].name).toEqual('test');
```

## Mock Return Values
Mock functions can also be used to define different return values during the test.

```js
const myMock = jest.fn();
console.log(myMock());
// > undefined

myMock
  .mockReturnValueOnce(10)
  .mockReturnValueOnce('x')
  .mockReturnValue(true);

console.log(myMock(), myMock(), myMock(), myMock());
// > 10, 'x', true, true
```

Above code snippet is defining `10`, `'x'` and `true` mock return values.

It works in such a way that:
- first call to mock function will return `10`
- second call will return `'x'`
- third and further calls will return `true`




