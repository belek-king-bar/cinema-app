import {LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS} from "../actions/login";

const initialState = {
        loading: false,
        errors: {}
};


const loginreducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                login: {
                    ...state.login,
                    errors: {},
                    loading: true
                }
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                login: {
                    ...state.login,
                    loading: false,
                },
                auth: action.data
            };
        case LOGIN_ERROR:
            return {
                ...state,
                login: {
                    ...state.login,
                    loading: false,
                    errors: action.errors
                }
            };
        default:
            return state;
    }
};

export default loginreducer;

