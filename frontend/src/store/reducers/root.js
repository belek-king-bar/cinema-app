import {combineReducers} from 'redux';
import loginReducer from "./login";
import authReducer from "./auth";
import tokenLoginReducer from "./app";
import movieListReducer from "./movie_list";
import movieEditReducer from "./movie_edit"

const rootReducer = combineReducers({
    login: loginReducer,
    auth: authReducer,
    app: tokenLoginReducer,
    movieList: movieListReducer,
    movieEdit: movieEditReducer
});

export default rootReducer;