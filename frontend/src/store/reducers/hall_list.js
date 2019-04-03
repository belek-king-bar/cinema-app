import {HALL_LIST_REQUEST_SUCCESS} from "../actions/hall_list";

const initialState = {
    halls: []
};

const hallListReducer = (state = initialState, action) => {
    switch (action.type) {
        case HALL_LIST_REQUEST_SUCCESS:
            return {...state, halls: action.halls};
        default:
            return state;
    }
};

export default hallListReducer;