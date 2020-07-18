import {
  GET_DETAIL_USER,
  RATING_DRIVER,
  EDIT_PERSONAL_USER,
  UPDATE_AVATAR,
} from './actionTypes';
import apiCaller from '../../utils/apiCaller';
import swal from 'sweetalert';

export const getDetailUser = (userID) => {
  return (dispatch) => {
    return apiCaller(`users/${userID}`, 'GET', null)
      .then((res) => {
        dispatch({
          type: GET_DETAIL_USER,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err.response));
  };
};

export const ratingDriver = (id, data) => {
  return (dispatch) => {
    return apiCaller(`users/rating/${id}`, 'PUT', { rate: data })
      .then((res) => {
        dispatch({
          type: RATING_DRIVER,
          payload: res.data,
        });
        swal({
          text: 'Rating successfully',
          icon: 'success',
          buttons: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        if (err.response.status === 401) {
          return swal({
            text: 'You have to login for rating',
            icon: 'error',
            buttons: false,
            timer: 1500,
          });
        }
        console.log(err.response);
      });
  };
};

export const editPersonalUser = (
  userID,
  value,
  callbackThen,
  callbackCatch
) => {
  return (dispatch) => {
    return apiCaller(`users/personal/${userID}`, 'PUT', value)
      .then((res) => {
        dispatch({
          type: EDIT_PERSONAL_USER,
          payload: res.data,
        });
        swal({
          text: 'Update successfully',
          icon: 'success',
          buttons: false,
          timer: 1500,
        });
        callbackThen();
      })
      .catch((err) => {
        callbackCatch(err);
      });
  };
};

export const updateAvatar = (userID, value, config, callback) => {
  return (dispatch) => {
    return apiCaller(`users/upload-avatar/${userID}`, 'POST', value, config)
      .then((res) => {
        dispatch({
          type: UPDATE_AVATAR,
          payload: res.data,
        });
        swal({
          text: 'Update successfully',
          icon: 'success',
          buttons: false,
          timer: 1500,
        });
        callback();
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};
