const axios = require('axios');
const Users = require('./user');

jest.mock('axios');

describe('Mock Functions - Axios', () => {
  beforeAll(() => {
  })
  test('should fetch users', () => {
    const response = {
      data: [
        {
          name: 'Alice'
        }
      ]
    };
  
    axios.get.mockResolvedValue(response);
  
    return Users.all().then(users => expect(users).toEqual(response.data));
  })  
});