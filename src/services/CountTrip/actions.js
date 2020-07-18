import { COUNT_TRIP } from './actionTypes';
import apiCaller from '../../utils/apiCaller';

export const countTrips = () => {
  return (dispatch) => {
    return apiCaller('trips/count-trip', 'GET', null)
      .then((res) => {
        dispatch({
          type: COUNT_TRIP,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err.response));
  };
};
