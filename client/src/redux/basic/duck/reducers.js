import types from "./types";

const INITIAL_STATE = {
    user: false,
    value: 0,
    value1: 2
};

const basicReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case types.SET_USER:
            return {
                ...state,
                user: action.user
            }

        default:
            return state;
    }
};

export default basicReducer;
