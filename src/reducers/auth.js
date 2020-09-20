import {
    LOGIN_SUCCESS,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGIN_FAIL,
    LOGOUT
} from '../actions/types';

const initialState = {
    isAuthenticated: null,
    loading: false,
    user: {
        username:""
    },
};

const authReducer = (state = initialState, action) => {

    switch(action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload,
            }
        case SIGNUP_SUCCESS:
            localStorage.setItem('token', action.payload);
            return {
            ...state,
            ...action.payload,
            isAuthenticated: true,
            loading: false,
            }
        case SIGNUP_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                loading: false,
            }
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.clear();
            return {
                isAuthenticated: false,
                loading: false,
                user: null,
            }
        default:
            return state
    }
}
export default authReducer;

/*
const userReducer = (state = defaultState, action) => {
    switch(action.type){
        case "SET_USER":
            return {
                loadded: true,
                loggedIn: true,
                user: {...action.payload}
            }
        case "LOG_OUT":
            localStorage.clear()
            return {
                loadded: true,
                loggedIn: false,
                user: defaultState.user,
            }
        case "AUTO_LOGIN":
            return {
                ...state,
                loadded: true,
            }
        default: return state
    }
}

export default userReducer;
*/