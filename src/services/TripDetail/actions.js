import { GET_DETAIL_TRIP } from './actionTypes';
import apiCaller from '../../utils/apiCaller';

export const getDetailTrip = (id) => {
  return (dispatch) => {
    return apiCaller(`trips/detail/${id}`, 'GET', null)
      .then((res) => {
        dispatch({
          type: GET_DETAIL_TRIP,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err.response));
  };
};
