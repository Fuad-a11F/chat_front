import { combineReducers } from 'redux'
import { firstReducer } from './reducer/firstReducer'
import { secondReducer } from './reducer/loadingReducer'
import { userReducer } from './reducer/userReducer'

export const rootReducer = combineReducers({ firstReducer, secondReducer, userReducer })