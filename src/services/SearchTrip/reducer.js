import { SEARCH_TRIPS } from './actionTypes';

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

export const SearchTrips = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_TRIPS:
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
