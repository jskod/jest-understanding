const fetchData = require('./fetch-names');

describe('Fetch Data', () => {

  let response;

  beforeAll(() => {
    response = fetchData(); // returns a promise
  })

  test('returns array of length 25', () => {
    return response.then(res => {
      expect(res).toHaveLength(25);
    })
  })

  test('matches response data structure', () => {
    return response.then(res => {
      expect(res).toEqual( 
        expect.arrayContaining(
          [
            expect.objectContaining({
              name: expect.any(String),
              gender: expect.any(String),
              surname: expect.any(String),
              region: expect.any(String)
            })
          ]
        )
      )
    })
  })

  test('matches response data structure - aysnc await', async () => {
    expect.assertions(1);
    await expect(response).resolves.toEqual( 
      expect.arrayContaining(
        [
          expect.objectContaining({
            name: expect.any(String),
            gender: expect.any(String),
            surname: expect.any(String),
            region: expect.any(String)
          })
        ]
      )
    )
  })



});