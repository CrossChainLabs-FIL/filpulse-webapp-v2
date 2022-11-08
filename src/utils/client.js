const axios = require('axios');
const { API } = require ('../config');

axios.defaults.timeout = 30000;

export class Client {
  constructor() {
      this.api = API;
  }

  async get(endpoint) {
    const response = await axios.get(this.api + endpoint);

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
}