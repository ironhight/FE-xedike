import { GET_DETAIL_TRIP } from './actionTypes';

let initialState = {
    isLoading: true,
    data: [
        {
            _id: '',
            locationFrom: '',
            locationTo: '',
            availableSeats: '',
            fee: 10000,
            driverID: {
                rate: 0,
                _id: '',
                fullName: ''
            }
        }
    ]
};

export const TripDetail = (state = initialState, action) => {
    switch (action.type) {
        case GET_DETAIL_TRIP:
            return {
                isLoading: false,
                data: action.payload
            };
        default:
            return {
                ...state
            };
    }
};
