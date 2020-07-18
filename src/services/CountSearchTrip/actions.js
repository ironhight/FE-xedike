import { COUNT_SEARCH_TRIP } from './actionTypes';
import apiCaller from '../../utils/apiCaller';

export const countSearchTrips = (location) => {
  return (dispatch) => {
    return apiCaller(`trips/count/search${location}`, 'POST', null)
      .then((res) => {
        dispatch({
          type: COUNT_SEARCH_TRIP,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err.response));
  };
};
