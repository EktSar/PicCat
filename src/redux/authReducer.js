// Actions
const SET_TOKEN = 'skillbox-piccat/auth/SET_TOKEN';

let initialState = {
  token: null,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };

    default:
      return state;
  }
}

// Action Creators
export const setToken = (token) => {
  return {type: SET_TOKEN, token}
}

export default authReducer;