import {TOKEN_LOGIN_ERROR, TOKEN_LOGIN_REQUEST, TOKEN_LOGIN_SUCCESS} from "../actions/token-login";

const initialState = {
    app: {
        loading: true,
        errors: {}
    }};


const appreducer = (state = initialState, action) => {
    switch (action.type) {
        case TOKEN_LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                errors: {}
                };
        case TOKEN_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                };
        case TOKEN_LOGIN_ERROR:
            return {
                ...state,
                loading: false,
                errors: action.errors
                };
        default:
            return state;
    }
};


export default appreducer;