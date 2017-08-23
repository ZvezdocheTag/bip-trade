import io from 'socket.io-client';

export const SELECT_BITTREX_MARKET = 'SELECT_BITTREX_MARKET'
export const CONNECT_SOCKET_BITTREX = 'CONNECT_SOCKET_BITTREX'
export const SUCCESS_CONNECTION = 'SUCCESS_CONNECTION'
export const FAIL_CONNECTION = 'FAIL_CONNECTION'
export const SET_CURRENT_PAIR = 'SET_CURRENT_PAIR'
export const SET_ALARM_PAIR = 'SET_ALARM_PAIR'
export const FILTER_PAIR = 'FILTER_PAIR'


export const PUSH_NOTIFICATION = 'PUSH_NOTIFICATION' 

export const selectBittrexMarket = market => ({
    type: CONNECT_SOCKET_BITTREX,
    market
  })

export const successConnection = data => ({
    type: SUCCESS_CONNECTION,
    data
  })

export const failConnection = data => ({
    type: FAIL_CONNECTION,
    data
  })

export const connectSocketBittrex = result => ({
    type: CONNECT_SOCKET_BITTREX,
    result
  })

export const setCurrentPair = pair => ({
    type: SET_CURRENT_PAIR,
    pair
  })

export const setAlarmPair = (pair) => ({
    type: SET_ALARM_PAIR,
    pair
  })

export const pushNotification = pair => ({
    type: PUSH_NOTIFICATION,
    pair
  })

export const filterPair = (name) => {
  type: FILTER_PAIR,
  name
}

export const fetchData = market => dispatch => {
    io("http://localhost:3005").on("data", data => {
        if(data !== null) {
            dispatch(successConnection(data.result))
        }
    });
}