import { ADD_CAR } from './actionTypes';

let initialState = [];

export const Cars = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CAR:
            return action.payload;
        default:
            return state;
    }
};
