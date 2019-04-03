import {combineReducers} from 'redux';
import loginReducer from "./login";
import authReducer from "./auth";
import tokenLoginReducer from "./app";
import movieListReducer from "./movie_list";
import movieDetailReducer from "./movie_detail"
import movieEditReducer from "./movie_edit"
import movieAddReducer from "./movie_add"
import hallListReducer from "./hall_list"
import hallDetailReducer from "./hall_detail"
import hallEditReducer from "./hall_edit"
import hallAddReducer from "./hall_add"
import registerReducer from "./register"
import userDetailReducer from "./user_detail"

const rootReducer = combineReducers({
    login: loginReducer,
    register: registerReducer,
    auth: authReducer,
    app: tokenLoginReducer,
    movieList: movieListReducer,
    movieDetail: movieDetailReducer,
    movieEdit: movieEditReducer,
    movieAdd: movieAddReducer,
    hallList: hallListReducer,
    hallDetail: hallDetailReducer,
    hallEdit: hallEditReducer,
    hallAdd: hallAddReducer,
    user: userDetailReducer
});

export default rootReducer;