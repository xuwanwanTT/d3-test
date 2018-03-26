import axios from 'axios';

const methodType = function (method) {
  const map = {
    "get": 1,
    "post": 0,
  };
  return map[method.toLowerCase()];
};

class Api {
  constructor(option) {
    let me = this;
    me._option = option;
  }
  send(params) {
    let me = this;
    let config = { method: me._option.method, responseType: "json" };
    if (me._option.simulation) {
      config.url = me._option.simulator;
    } else {
      config.baseURL = me._option.baseUrl;
      config.url = me._option.url;
      if (methodType(me._option.method)) {
        config.params = params;
      } else {
        config.data = params;
      }
    }
    return axios(config).then(res => {
      return res.data
    });
  }
};

class ApiBuilder {
  build(option) {
    let api = new Api(option);
    return api;
  }
};

export default ApiBuilder;
