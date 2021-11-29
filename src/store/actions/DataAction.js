import axios from 'axios'

//Set the value of the time selector
export const setValue = (val ) =>  dispatch =>{
    dispatch( {
        type: 'SET_VALUE',
        payload: val
    })
}

//Set the data type value of the time selector
export const setDataType = (dataType) =>  dispatch =>{
    dispatch( {
        type: 'SET_DATA_TYPE',
        payload: String(dataType)
    })

}

//Set the data that presenting on the chart/ table

export const setData = (val) =>  dispatch =>{
    dispatch( {
        type: 'SET_DATA',
        payload: val
    })

}
//Set the loading indicator

export const setLoading = (val) =>  dispatch =>{
    dispatch( {
        type: 'SET_LOADING',
        payload: val
    })

}

// fetch data of 1 minute
export const getDataMin = () => async dispatch => { 

    try{
        var res
         res = await axios.get(`https://www.fxempire.com/api/v1/en/crypto-coin/chart/candles/histominute?aggregate=1&e=CCCAGG&fsym=BTC&tsym=usd`
        ,{params:{
            limit:30
        }}
        )
        dispatch( {
            type: 'GET_DATA_MIN',
            payload: res.data
        })
    }
    catch(e){
        dispatch( {
            type: 'DATA_ERROR',
            payload: console.log(e),
        })
    }
    return Promise.resolve()

}

export const setFiveMin = (data) =>  dispatch =>{
    dispatch( {
        type: 'SET_FIVE_MIN',
        payload: data
    })

}
// fetch data of 5 minute

export const getData5Min = () => async dispatch => {    
    try{
        var res
         res = await axios.get(`https://www.fxempire.com/api/v1/en/crypto-coin/chart/candles/histominute?aggregate=1&e=CCCAGG&fsym=BTC&tsym=usd`
        ,{params:{
            limit:150
        }}
        )
        console.log(res.data)

        dispatch( {
            type: 'GET_DATA_5MIN',
            payload: res.data
        })
    }
    catch(e){
        dispatch( {
            type: 'DATA_ERROR',
            payload: console.log(e),
        })
    }
    return Promise.resolve()

}

// fetch data of 1 hour

export const getDataHour = () => async dispatch => {
    
    try{
        var res
         res = await axios.get(`https://www.fxempire.com/api/v1/en/crypto-coin/chart/candles/histohour?aggregate=1&e=CCCAGG&fsym=BTC&tsym=usd`
        ,{params:{
            limit:30
        }}
        )
        dispatch( {
            type: 'GET_DATA_HOUR',
            payload: res.data
        })
    }
    catch(e){
        dispatch( {
            type: 'DATA_ERROR',
            payload: console.log(e),
        })
    }
    return Promise.resolve()


}
// fetch data of 1 week

export const getDataWeek = () => async dispatch => {
    
    try{
        var res
         res = await axios.get(`https://www.fxempire.com/api/v1/en/crypto-coin/chart/candles/histoday?aggregate=7&e=CCCAGG&fsym=BTC&tsym=usd`
        ,{params:{
            limit:30
        }}
        )
        dispatch( {
            type: 'GET_DATA_WEEK',
            payload: res.data
        })
    }
    catch(e){
        dispatch( {
            type: 'DATA_ERROR',
            payload: console.log(e),
        })
    }
    return Promise.resolve()


}