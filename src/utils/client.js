const axios = require('axios');
const { API } = require ('../config');

axios.defaults.timeout = 30000;

export class Client {
  constructor() {
      this.api = API;
  }

  async get(endpoint, params = null) {
    let response;
    if (params) {
      console.log(params);
      response = await axios.get(this.api + endpoint, { params: params });
    } else {
      response = await axios.get(this.api + endpoint);
    }


    if (!response || response.status !== 200) {
      return undefined;
    }

    return response.data;
  }

  async post(endpoint, data) {
    const response = await axios.post(this.api + endpoint, data);

    if (!response || response.status !== 200) {
      return undefined;
    }

    return response.data;
  }

  async post_with_token(endpoint, params, token) {
    const response = await axios.post(
      this.api + endpoint,
      {},
      {
        params: params,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

    if (!response || response.status !== 200) {
      return undefined;
    }

    return response.data;
  }
}