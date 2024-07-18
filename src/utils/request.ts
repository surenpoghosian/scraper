import { IFetchOptions } from '../configs/types';

const request = async (opts: IFetchOptions) => {
  const options = { ...opts };
  options.headers = options.headers || {};
  options.headers = {
    ...options.headers,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  options.timeout = 2 * 10000;

  const endpoint = options.path;

  return fetch(endpoint, options);
};

export default request;
