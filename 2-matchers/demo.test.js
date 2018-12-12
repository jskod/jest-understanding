describe('Testing matchers', () => {

  test('42 is equal to 42', () => {
    expect(42).toBe(42) // Strict equality (===)
  });
  
  test('42 is not equal to 3', () => {
    expect(42).not.toBe(3) // Strict equality (!==)
  })

  test('[1, 2] is equal to an array of data [1, 2]', () => {
    expect([1, 2]).toEqual([1, 2]) // Deep equality
  })

  test('{ a: undefined, b: 2 } is equal to { b: 2 }', () => {
    expect({ a: undefined, b: 2 }).toEqual({ b: 2 }) // Deep equality
  })

  test('{ a: undefined, b: 2 } is not equal to { b: 2 }', () => {
    expect({ a: undefined, b: 2 }).not.toStrictEqual({ b: 2 }) // Strict equality (Jest 23+)
  })

});

describe('Truthiness', () => {
  test('"foo" is truthy', () => {
    // Matches anything that an if statement treats as true (not false, 0, '', null, undefined, NaN)
    expect('foo').toBeTruthy()
  })

  test('"" is falsy', () => {
    // Matches anything that an if statement treats as false (false, 0, '', null, undefined, NaN)
    expect('').toBeFalsy()
  })

  test('null is null', () => {
    // Matches only null
    expect(null).toBeNull()
  })

  test('undefined is undefined', () => {
    // Matches only undefined
    expect(undefined).toBeUndefined()
  })

  test('value 7 is defined', () => {
    // The opposite of toBeUndefined
    expect(7).toBeDefined()
  })
});

describe('Numbers', () => {
  test('2 is greater than 1', () => {
    expect(2).toBeGreaterThan(1)
  })

  test('1 is greater or equal to 1', () => {
    expect(1).toBeGreaterThanOrEqual(1)
  })

  test('1 is less than 2', () => {
    expect(1).toBeLessThan(2)
  })

  test('1 is less or equal to 1', () => {
    expect(1).toBeLessThanOrEqual(1)
  })

  test('0.2 + 0.1 is close to 0.3 at 5 significant figures', () => {
    expect(0.2 + 0.1).toBeCloseTo(0.3, 5)
  })
});

describe('Strings', () => {
  test('"long string" matches "str"', () => {
    expect('long string').toMatch('str')
  })

  test('"coffee" matches /ff/', () => {
    expect('coffee').toMatch(/ff/)
  })

  test('"pizza" does not match to "coffee"', () => {
    expect('pizza').not.toMatch('coffee')
  })

  test('[pizza, coffee] is equal to [expect-containing(zz), expect-matching(/ff/)]', () => {
    expect(['pizza', 'coffee']).toEqual([expect.stringContaining('zz'), expect.stringMatching(/ff/)])
  })

});

describe('Arrays', () => {
  test("['Alice', 'Bob', 'Eve'] has length 3", () => {
    expect(['Alice', 'Bob', 'Eve']).toHaveLength(3)
  })

  test("['Alice', 'Bob', 'Eve'] contains 'Alice'", () => {
    expect(['Alice', 'Bob', 'Eve']).toContain('Alice')
  })

  test('[{ a: 1 }, { a: 2 }] contains { a: 1}', () => {
    expect([{ a: 1 }, { a: 2 }]).toContainEqual({ a: 1 })
  })

  test("['Alice', 'Bob', 'Eve'] is equal to expect-containing(['Alice', 'Bob'])", () => {
    expect(['Alice', 'Bob', 'Eve']).toEqual(expect.arrayContaining(['Alice', 'Bob']))
  })
});

describe('Objects', () => {
  test('{ a: 1 } has property "a"', () => {
    expect({ a: 1 }).toHaveProperty('a')
  })

  test('{ a: 1 } has property "a" with value "1"', () => {
    expect({ a: 1 }).toHaveProperty('a', 1)
  })

  test('{ a: { b: 1 } } has property "a.b"', () => {
    expect({ a: { b: 1 } }).toHaveProperty('a.b')
  })

  test('{ a: 1, b: 2 } matches object { a: 1 }', () => {
    expect({ a: 1, b: 2 }).toMatchObject({ a: 1 })
  })

  test('{ a: 1, b: 2} matches object { a: <Any Number>, b: <Any Number>}', () => {
    expect({ a: 1, b: 2 }).toMatchObject({
      a: expect.any(Number),
      b: expect.any(Number)
    })
  })

  test('[{ a: 1 }, { b: 2 }] is equal to [{ a: <Any Number>}, <Anything>]', () => {
    expect([{ a: 1 }, { b: 2 }]).toEqual([
      expect.objectContaining({ a: expect.any(Number) }),
      expect.anything()
    ])
  })

})