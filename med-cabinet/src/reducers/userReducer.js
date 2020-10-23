import { EDIT_USER, EDIT_USER_SUCCESS, EDIT_USER_FAILED } from '../actions/userAction';

const initialState = {
    user: [],
    isEditing: false,
    error: ''
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case EDIT_USER:
            return{
                ...state,
                isEditing: true,
            };
        case EDIT_USER_SUCCESS:
            return{
                ...state,
                isEditing: false,
                user: action.payload
            }
        case EDIT_USER_FAILED:
            return{
                ...state,
                isEditing: false,
                error: action.payload
            }
    }
}

export default userReducer;