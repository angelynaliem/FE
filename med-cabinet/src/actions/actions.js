import axios from 'axios';

//get api data

export const GET_DATA = "GET_DATA";
export const GET_DATA_PASS = "GET_DATA_PASS";
export const GET_DATA_FAIL = "GET_DATA_FAIL";


export const getData = () => dispatch =>{
    dispatch({
         type: GET_DATA
        })
    axios
    .get('')//api data
    .then((res)=>{
        dispatch({
            type: GET_DATA_PASS,
            payload: res.data
        });
    })
    .catch((err)=>{
        dispatch({
            type:GET_DATA_FAIL,
            payload: err
        })
    })
}