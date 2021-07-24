import axios from 'axios';
import {Headers} from '../models/Headers';
import {serviceOptions} from './serviceOptions';

const API_BASEURL =
  'http://futligaservices-test.sa-east-1.elasticbeanstalk.com';

let headers: Headers = {
  usuario: 'joint',
  senha: 'thiago.holanda',
};

let getInstance = () => {
  let client = axios.create({
    baseURL: `${API_BASEURL}`,
    headers: headers,
  });
  serviceOptions.axios = client;
  return client;
};

export const Authorization = (token: string) => {
  headers.Authorization = `Bearer ${token}`;
  serviceOptions.axios = getInstance();
};

export const api = getInstance();
