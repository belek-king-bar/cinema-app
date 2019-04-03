import {MOVIE_LOAD_SUCCESS} from "../actions/movie_edit";
import {SHOW_LOAD_SUCCESS} from "../actions/show_load";

const initialState = {
    movie: null,
    show: null
};

const movieDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case MOVIE_LOAD_SUCCESS:
            const categories = action.movie.categories.map(category => category.id);
            const movie = {...action.movie, categories};
            return {...state, movie};
        case SHOW_LOAD_SUCCESS:
            return {...state, show: action.show};
        default:
            return state
    }
};


export default movieDetailReducer;