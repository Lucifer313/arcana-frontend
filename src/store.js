import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import userDetailsReducer from './reducers/admin-reducer'
import teamDetailsReducer from './reducers/team-reducer'

const reducers = combineReducers({
  userDetails: userDetailsReducer,
  teamDetails: teamDetailsReducer,
})

const userInfoFromLocalStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userDetails: {
    userInfo: userInfoFromLocalStorage,
  },
  teamDetails: {
    teams: [],
    filteredTeams: [],
  },
}

const middleware = [thunk]

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
