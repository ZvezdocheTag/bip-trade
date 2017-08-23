import { combineReducers } from 'redux'
import {
    SELECT_BITTREX_MARKET,
    CONNECT_SOCKET_BITTREX,
    SUCCESS_CONNECTION,
    FAIL_CONNECTION,
    SET_CURRENT_PAIR,
    SET_ALARM_PAIR,
    PUSH_NOTIFICATION
} from '../actions'

const selectMarket = (state = 'getmarketsummaries', action) => {
  switch (action.type) {
    case SELECT_BITTREX_MARKET:
      return action.market
    default:
      return state
  }
}

const defaultState = {
    connection: false,
    tradePair: [],
    selectedPair: [],
    selectedAlarmPair: []
}

const marketData = (state = defaultState, action ) => {
    switch(action.type) {
        case CONNECT_SOCKET_BITTREX:
            return {...state, connection: true}
        case SUCCESS_CONNECTION:
            return {...state, tradePair: action.data}
        case FAIL_CONNECTION:
            return state
        case SET_CURRENT_PAIR: 
            return {...state, selectedPair: [...state.selectedPair, action.pair]}
        case SET_ALARM_PAIR:
            return {...state, selectedAlarmPair: [...state.selectedAlarmPair, action.pair]}
        case PUSH_NOTIFICATION:
        default:
            return state
    }
}
const rootReducer = combineReducers({
    selectMarket,
    marketData
})

export default rootReducer
