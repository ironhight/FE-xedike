import { COUNT_TRIP } from './actionTypes';

let initialState = 0;

export const CountTrip = (state = initialState, action) => {
    switch (action.type) {
        case COUNT_TRIP:
            return action.payload;
        default:
            return state;
    }
};
