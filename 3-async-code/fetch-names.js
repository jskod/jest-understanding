const axios = require('axios');

const URL = 'https://uinames.com/api/?amount=25';
const fetchData = () => {
  return axios(URL).then(response => {
    if (response.status === 200) {
      return response.data;
    }

    return Promise.reject(Error('error'));
  });
}



module.exports = fetchData;