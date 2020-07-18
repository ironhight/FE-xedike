import axios from 'axios';
import { API_URL } from '../constants/config';

const apiCaller = (endPoint, method = 'GET', body, header) => {
  return axios({
    method: method,
    url: `${API_URL}/${endPoint}/`,
    data: body,
    header: header,
  });
};

export default apiCaller;
