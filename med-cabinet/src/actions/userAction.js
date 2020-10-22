import axios from 'axios';

export const userId = () => {
    if (window.localStorage.getItem('id')) {
        return window.localStorage.getItem('id')
    }
}

export const EDIT_USER = 'EDIT_USER';
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
export const EDIT_USER_FAILED = 'EDIT_USER_FAILED';

export const editUser = (user) => dispatch => {
    dispatch({ type: EDIT_USER })
    axios
        .put(`https://reqres.in/api/users/${userId()}`, user)
        .then(res => {
            newUserId = user.id
            dispatch({ type: EDIT_USER_SUCCESS })
        })
        .catch(err => {
            console.log(err)
            dispatch({ type: EDIT_USER_FAILED, payload: err})
        })
}