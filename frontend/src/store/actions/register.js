import axios, {REGISTER_URL} from "../../api-urls";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_ERROR = "REGISTER_ERROR";

export const registerRequest = () => {
    return {type: REGISTER_REQUEST}
};

export const registerSuccess = (data) => {
    return {type: REGISTER_SUCCESS, data}
};

export const registerError = (errors) => {
    return {type: REGISTER_ERROR, errors}
};

export const register = (username, password, password_confirm, email) => {
    return dispatch => {
        dispatch(registerRequest());
        // для возможности дальнейшего использования then в месте вызова функции login()
        // результат запроса нужно вернуть: return.
        // результатом будет действие, обёрнутое в Promise
        // (dispatch возвращает переданное действие,
        // а then и catch оборачивают возвращаемые значения в Promise,
        // чтобы можно было дальше их чейнить).
        return axios.post(REGISTER_URL, {username, password, password_confirm, email}).then(response => {
            console.log(response);
            return dispatch(registerSuccess(response.data));
        }).catch(error => {
            console.log(error);
            console.log(error.response);
            // либо отсюда вернётся действие из loginError()
            return dispatch(registerError(error.response.data));
        });
    }
};