import {combineReducers} from 'redux'
import {firstReducer} from './reducer/firstReducer'
import {secondReducer} from './reducer/loadingReducer'

export const rootReducer = combineReducers({firstReducer, secondReducer})