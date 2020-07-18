import { COUNT_SEARCH_TRIP } from './actionTypes';

let initialState = 0;

export const CountSearchTrip = (state = initialState, action) => {
    switch (action.type) {
        case COUNT_SEARCH_TRIP:
            return action.payload;
        default:
            return state;
    }
};
