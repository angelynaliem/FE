import axios from 'axios';
import { axiosWithAuth } from '../utils/axiosWithAuth';

export const userId = () => {
    if (window.localStorage.getItem('id')) {
        return window.localStorage.getItem('id')
    }
}

export const EDIT_USER = 'EDIT_USER';
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
export const EDIT_USER_FAILED = 'EDIT_USER_FAILED';

export const userUpdateStart = (e) => (dispatch) => {
    dispatch({type: EDIT_USER, payload: {
        targetName: e.target.name,
        targetValue: e.target.value
    }})
}
// export let newUserId

export const editUser = (state) => (dispatch) => {
    const id = parseInt(localStorage.getItem('id'));
    // dispatch({ type: EDIT_USER })
    axiosWithAuth()
        .put("api/user", state)
        .then(res => {
            dispatch({ type: EDIT_USER_SUCCESS })
        })
        .catch(err => {
            console.log(err)
            dispatch({ type: EDIT_USER_FAILED, payload: err})
        })
}