import types from "./types";

const setResultsFlag = isShown => ({
    type: types.SET_RESULTS_FLAG,
    isShown: isShown
})

const toggleResultsFlag = () => ({
    type: types.TOGGLE_RESULTS_FLAG,
})

const setUser = user => ({
    type: types.SET_USER,
    user
})

export default {
    setUser,
    setResultsFlag,
    toggleResultsFlag
}