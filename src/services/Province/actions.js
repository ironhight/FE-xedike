import { GET_PROVINCES } from './actionTypes';
import apiCaller from '../../utils/apiCaller';

export const getProvinces = () => {
  return (dispatch) => {
    return apiCaller('provinces', 'GET', null)
      .then((res) => {
        dispatch({
          type: GET_PROVINCES,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err.response));
  };
};
