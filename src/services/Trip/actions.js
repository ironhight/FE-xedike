import { GET_TRIPS, CREATE_TRIP } from './actionTypes';
import apiCaller from '../../utils/apiCaller';
import swal from 'sweetalert';

export const getTrips = (limit) => {
  return (dispatch) => {
    return apiCaller(`trips/get-all/${limit}`, 'GET', null)
      .then((res) => {
        dispatch({
          type: GET_TRIPS,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err.response));
  };
};

export const createTrip = (data, callback) => {
  return (dispatch) => {
    return apiCaller(`trips`, 'POST', data)
      .then((res) => {
        swal({
          text: 'Create trip successfully!',
          icon: 'success',
          buttons: false,
          timer: 1500,
        }).then(() => {
          dispatch({
            type: CREATE_TRIP,
            payload: res.data,
          });
          callback();
        });
      })
      .catch((err) => console.log(err.response));
  };
};
