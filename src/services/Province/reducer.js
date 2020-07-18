import { GET_PROVINCES } from './actionTypes';

let initialState = [];

export const Provinces = (state = initialState, action) => {
    switch (action.type) {
        case GET_PROVINCES:
            return action.payload;
        default:
            return state;
    }
};
