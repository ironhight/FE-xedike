import {
    GET_DETAIL_USER,
    RATING_DRIVER,
    EDIT_PERSONAL_USER,
    UPDATE_AVATAR
} from './actionTypes';
import _ from 'lodash';

let initialState = {
    isLoading: true,
    user: {
        registerDate: '',
        rate: 0,
        _id: '',
        email: '',
        DOB: null,
        userType: '',
        phoneNumber: '',
        fullName: '',
        avatar: ''
    },
    cars: [
        {
            carModel: '',
            carSeats: '',
            carName: '',
            autoMakers: '',
            carCertificate: '',
            driverID: ''
        }
    ]
};

export const UserInfo = (state = initialState, action) => {
    switch (action.type) {
        case GET_DETAIL_USER:
            return {
                isLoading: false,
                ...action.payload
            };
        case RATING_DRIVER:
            let dataRating = { ...state };
            dataRating.user.rate = action.payload.rate;

            return dataRating;
        case EDIT_PERSONAL_USER:
            let dataPersonal = { ...state };

            const keyArr = Object.keys(action.payload);

            _.forEach(keyArr, function(value) {
                dataPersonal.user[value] = action.payload[value];
            });

            return dataPersonal;
        case UPDATE_AVATAR:
            let avatar = { ...state };
            avatar.user.avatar = action.payload.avatar;

            return avatar;
        default:
            return state;
    }
};
