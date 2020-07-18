import { GET_TRIPS, CREATE_TRIP } from './actionTypes';

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

export const Trips = (state = initialState, action) => {
    switch (action.type) {
        case GET_TRIPS:
            return {
                isLoading: false,
                data: action.payload
            };
        case CREATE_TRIP:
            state.data.push(action.payload);

            return {
                isLoading: false,
                data: [...state.data]
            };
        default:
            return {
                ...state
            };
    }
};
