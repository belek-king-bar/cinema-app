import axios from "axios";

export const DELETE_SUCCESS = 'DELETE_SUCCESS';


export const deleteMovieHall = (URL, id) => {
    return dispatch => {
        return axios.delete(URL + id + '/', {
                headers: {
                    Authorization: "Token " + localStorage.getItem('auth-token')
                }
            }).then(response => {
            console.log(response);
            return dispatch({type: DELETE_SUCCESS})
        }).catch(error => {
            console.log(error);
            console.log(error.response);
        });
    }
};