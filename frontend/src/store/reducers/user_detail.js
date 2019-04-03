import {USER_LOAD_SUCCESS} from "../actions/user_detail";

const initialState = {
    user: {}
};

const userDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOAD_SUCCESS:
            return {...state, user: action.user};
        default:
            return state
    }
};


export default userDetailReducer;