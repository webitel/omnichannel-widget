import axios from 'axios';
import { objCamelToSnake, objSnakeToCamel } from '@webitel/ui-sdk/src/scripts/caseConverters';

const instance = axios.create({
  withCredentials: true,
});

instance.interceptors.request.use(
  (request) => {
    if (request.method === 'post'
      || request.method === 'put'
      || request.method === 'patch') {
      if (typeof request.data === 'string') {
        // eslint-disable-next-line no-param-reassign
        request.data = JSON.stringify(objCamelToSnake(JSON.parse(request.data)));
      } else {
        // eslint-disable-next-line no-param-reassign
        request.data = objCamelToSnake(request.data);
      }
    }
    return request;
  },
);

instance.interceptors.response.use(
  (response) => objSnakeToCamel(response.data),
  (error) => Promise.reject(error.response.data),
);

export default instance;
