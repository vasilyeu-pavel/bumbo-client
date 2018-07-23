import qs from 'qs';
import request from 'axios';


export default class DataFetcher {
  constructor(url, params) {
    this.url = url || '/';
    this.params = params || {};
  }

  stringifyParams = params => qs.stringify(params, { format: 'RFC1738', arrayFormat: 'brackets' });

  get() {
    return request.get(`${this.url}?${this.stringifyParams(this.params)}`);
  }
}
