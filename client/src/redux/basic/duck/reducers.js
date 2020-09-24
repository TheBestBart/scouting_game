import types from "./types";

const INITIAL_STATE = {
    user: false,
    resultsFlag: true,
};

const basicReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case types.SET_USER:
            return {
                ...state,
                user: action.user
            }

        case types.TOGGLE_RESULTS_FLAG:
            return {
                ...state,
                resultsFlag: action.isShown
            }
        
        case types.SET_RESULTS_FLAG: 
            return {
                ...state,
                resultsFlag: !state.resultsFlag
            }

        default:
            return state;
    }
};

export default basicReducer;
