import {HALL_LOAD_SUCCESS} from "../actions/hall_edit";
import {SHOW_LOAD_SUCCESS} from "../actions/show_load";

const initialState = {
    hall: null,
    show: null
};

const hallDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case HALL_LOAD_SUCCESS:
            return {...state, hall: action.hall};
        case SHOW_LOAD_SUCCESS:
            return {...state, show: action.show};
        default:
            return state
    }
};


export default hallDetailReducer;