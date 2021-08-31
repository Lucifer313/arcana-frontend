import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore, persistReducer } from 'redux-persist'

import storage from 'redux-persist/lib/storage'

import userDetailsReducer from './reducers/user-reducer'
import teamDetailsReducer from './reducers/team-reducer'
import playerDetailsReducer from './reducers/player-reducer'
import tournamentDetailsReducer from './reducers/tournament-reducer'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'userDetails',
    'teamDetails',
    'playerDetails',
    'tournamentDetails',
  ],
}

const reducers = persistReducer(
  persistConfig,
  combineReducers({
    userDetails: userDetailsReducer,
    teamDetails: teamDetailsReducer,
    playerDetails: playerDetailsReducer,
    tournamentDetails: tournamentDetailsReducer,
  })
)

const userInfoFromLocalStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userDetails: {
    userInfo: userInfoFromLocalStorage,
    myTournaments: [],
    allowed: false,
    previousSquad: {
      playingSquad: [],
      playingSquadIds: [],
      reserveSquad: [],
      reserveSquadIds: [],
    },
    newPlayingSquad: [],
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
    qualifiedPlayers: [],
    qualifiedTeams: {
      teams: [],
      eliminatedTeams: [],
    },
    playerLeaderboard: [],
  },
}

const middleware = [thunk]

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

const persistor = persistStore(store)

export { store, persistor }
