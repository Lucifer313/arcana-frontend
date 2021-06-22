import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import userDetailsReducer from './reducers/user-reducer'
import teamDetailsReducer from './reducers/team-reducer'
import playerDetailsReducer from './reducers/player-reducer'
import tournamentDetailsReducer from './reducers/tournament-reducer'

const reducers = combineReducers({
  userDetails: userDetailsReducer,
  teamDetails: teamDetailsReducer,
  playerDetails: playerDetailsReducer,
  tournamentDetails: tournamentDetailsReducer,
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

  playerDetails: {
    players: [],
    filteredPlayers: [],
  },

  tournamentDetails: {
    tournaments: [],
  },
}

const middleware = [thunk]

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
