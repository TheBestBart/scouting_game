import types from "./types";

const setUser = user => ({
    type: types.SET_USER,
    user
})

export default {
    setUser
}