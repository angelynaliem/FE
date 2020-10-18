import * as actions from '../actions/actions';

const initialState = {
    strains:[],
    isFetching: false,
    isUploading: false,
    error: "",
}

const reducer = (state= initialState,action)=>{
    switch(action.type){
        case actions.GET_DATA:
            return{
                ...state,
                isFetching: true,
            };
        case actions.GET_DATA_PASS:
            return{
                ...state,
                strains: action.payload,
                isFetching: false,
            };
        case actions.GET_DATA_FAIL:
            return{
                ...state,
                isFetching:false,
                error:action.payload
            }
            
    }
}