import { GET_HISTORY_TRIPS, FINISH_TRIP } from './actionTypes';
import apiCaller from '../../utils/apiCaller';
import swal from 'sweetalert';

export const getHistoryTrips = () => {
  return (dispatch) => {
    return apiCaller('users/history-trips', 'GET', null)
      .then((res) => {
        dispatch({
          type: GET_HISTORY_TRIPS,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err.response));
  };
};

export const finishTrip = (tripID) => {
  return (dispatch) => {
    return apiCaller(`trips/finish-trip/${tripID}`, 'PUT', null)
      .then((res) => {
        dispatch({
          type: FINISH_TRIP,
          payload: res.data,
        });
        swal({
          title: 'Finish trip successfully!',
          icon: 'success',
          timer: 2000,
        });
      })
      .catch((err) => console.log(err));
  };
};
