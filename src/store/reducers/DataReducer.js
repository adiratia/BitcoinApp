// Initial Global State
const initialState = {
    data:[],
    min:[],
    fiveMin:[],
    hour:[],
    week:[],
    dataType:'min',
    loading:true,
    value: 1

}
 export default function DataReducer( state = initialState, action){

    switch(action.type){
        case 'SET_DATA_TYPE':     
        return {
            ...state,
            dataType:action.payload,

        }
        case 'GET_DATA_MIN':
            console.log('action pay load min: ' + action.payload)

        return {
            ...state,
            min:action.payload,
            dataType:'min',
            loading:false
        }
        case 'GET_DATA_5MIN':

            return {
                ...state,
                fiveMin:action.payload,
                dataType:'5min',
               // loading:false
    
            }
        case 'GET_DATA_HOUR':
            return {
                ...state,
                hour:action.payload,
                dataType:'hour',
               // loading:false
    
            }
        case 'GET_DATA_WEEK':
                return {
                    ...state,
                    week:action.payload,
                    dataType:'week',
                   // loading:false
        
                }
        case 'SET_LOADING' :
             return {
                ...state,
                loading:action.payload
                    }
        case 'SET_VALUE' :
            return {
            ...state,
            value:action.payload
            }
        case 'SET_FIVE_MIN' :
            return {
                ...state,
                fiveMin:{timeFrom: 1 , data:action.payload}
                }
        case 'SET_DATA' :
            if(action.payload === 1)
                    return {
                    ...state,
                    data:state.min,
                    loading:false

            }
            if(action.payload === 2)
                    return {
                    ...state,
                    data:state.fiveMin,
                    loading:false

          }   
            if(action.payload === 3)
                return {
                ...state,
                data:state.hour,
                loading:false

            }
            if(action.payload === 4)
                return {
                ...state,
                data:state.week,
                loading:false

            }
            break; 
        default: return state
    }

}
