import { ADD_CAR } from './actionTypes';
import apiCaller from '../../utils/apiCaller';

export const addCar = (data, callback) => {
  return (dispatch) => {
    return apiCaller('cars', 'POST', data)
      .then((res) => {
        dispatch({
          type: ADD_CAR,
          payload: res.data,
        });
        callback();
      })
      .catch((err) => console.log(err));
  };
};
