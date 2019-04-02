import axios, {REGISTER_ACTIVATE_URL} from "../../api-urls";

export const REGISTER_ACTIVATE_REQUEST = "REGISTER_ACTIVATE_REQUEST";
export const REGISTER_ACTIVATE_SUCCESS = "REGISTER_ACTIVATE_SUCCESS";
export const REGISTER_ACTIVATE_ERROR = "REGISTER_ACTIVATE_ERROR";

export const register_activateRequest = () => {
    return {type: REGISTER_ACTIVATE_REQUEST}
};

export const register_activateSuccess = (data) => {
    return {type: REGISTER_ACTIVATE_SUCCESS, data}
};

export const register_activateError = (errors) => {
    return {type: REGISTER_ACTIVATE_ERROR, errors}
};

export const register_activate = (data) => {
    return dispatch => {
        dispatch(register_activateRequest());
        // для возможности дальнейшего использования then в месте вызова функции login()
        // результат запроса нужно вернуть: return.
        // результатом будет действие, обёрнутое в Promise
        // (dispatch возвращает переданное действие,
        // а then и catch оборачивают возвращаемые значения в Promise,
        // чтобы можно было дальше их чейнить).
        return axios.post(REGISTER_ACTIVATE_URL, {data}).then(response => {
            console.log(response);
            return dispatch(register_activateSuccess(response.data));
        }).catch(error => {
            console.log(error);
            console.log(error.response);
            // либо отсюда вернётся действие из loginError()
            return dispatch(register_activateError(error.response.data));
        });
    }
};