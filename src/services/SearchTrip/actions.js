import { SEARCH_TRIPS } from './actionTypes';
import apiCaller from '../../utils/apiCaller';
import swal from 'sweetalert';

export const searchTrips = (query) => {
  return (dispatch) => {
    return apiCaller(`trips/search${query}`, 'POST', null)
      .then((res) => {
        dispatch({
          type: SEARCH_TRIPS,
          payload: res.data,
        });
      })
      .catch((err) => {
        swal({
          text: err.response.data.message,
          icon: 'error',
          buttons: false,
          timer: 2000,
        });
        dispatch({
          type: SEARCH_TRIPS,
          payload: [],
        });
      });
  };
};
