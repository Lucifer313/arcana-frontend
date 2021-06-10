import {
  CREATE_PLAYER_FAILURE,
  CREATE_PLAYER_REQUEST,
  CREATE_PLAYER_RESET,
  CREATE_PLAYER_SUCCESS,
  DELETE_PLAYER_FAILURE,
  DELETE_PLAYER_REQUEST,
  DELETE_PLAYER_RESET,
  DELETE_PLAYER_SUCCESS,
  FILTER_PLAYERS,
  GET_PLAYERS_FAILURE,
  GET_PLAYERS_REQUEST,
  GET_PLAYERS_SUCCESS,
  SORT_PLAYERS,
  UPDATE_PLAYER_FAILURE,
  UPDATE_PLAYER_REQUEST,
  UPDATE_PLAYER_RESET,
  UPDATE_PLAYER_SUCCESS,
} from '../constants/player-constants'

const playerDetailsReducer = (state = { players: [] }, action) => {
  switch (action.type) {
    case CREATE_PLAYER_REQUEST: {
      return {
        ...state,
        error: false,
        creating: true,
        created: false,
      }
    }

    case CREATE_PLAYER_SUCCESS: {
      return {
        ...state,
        creating: false,
        created: true,
        players: [...state.players, action.payload],
      }
    }

    case CREATE_PLAYER_FAILURE: {
      return {
        ...state,
        creating: false,
        created: false,
        error: action.payload,
      }
    }

    case CREATE_PLAYER_RESET: {
      return {
        ...state,
        created: false,
        error: false,
        creating: false,
      }
    }

    case GET_PLAYERS_REQUEST: {
      return {
        ...state,
        players: [],
        filteredPlayers: [],
        loading: true,
        loaded: false,
      }
    }

    case GET_PLAYERS_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        players: action.payload,
      }
    }

    case GET_PLAYERS_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false,
        players: [],
        error: action.payload,
      }
    }

    case UPDATE_PLAYER_REQUEST: {
      return {
        ...state,
        updating: true,
        updated: false,
        error: false,
      }
    }

    case UPDATE_PLAYER_SUCCESS: {
      const updatedPlayers = state.players.filter(
        (player) => player._id !== action.payload._id
      )

      return {
        ...state,
        updating: false,
        updated: true,
        error: false,
        teams: [...updatedPlayers, action.payload],
      }
    }

    case UPDATE_PLAYER_FAILURE: {
      return {
        ...state,
        updating: false,
        updated: false,
        error: action.payload,
      }
    }

    case UPDATE_PLAYER_RESET: {
      return {
        ...state,
        updating: false,
        updated: false,
        error: false,
      }
    }
    case DELETE_PLAYER_REQUEST: {
      return {
        ...state,
        deleting: true,
        deleted: false,
        error: false,
      }
    }

    case DELETE_PLAYER_SUCCESS: {
      return {
        ...state,
        deleting: false,
        deleted: true,
        error: false,
        players: state.players.filter(
          (player) => player._id !== action.payload._id
        ),
      }
    }

    case DELETE_PLAYER_FAILURE: {
      return {
        ...state,
        deleting: false,
        deleted: false,
        error: action.payload,
      }
    }

    case DELETE_PLAYER_RESET: {
      return {
        ...state,
        deleting: false,
        deleted: false,
        error: false,
      }
    }

    case FILTER_PLAYERS: {
      let region = action.payload.region
      let name = action.payload.name

      let filteredPlayers =
        region !== 'All'
          ? state.players.filter((player) => player.region === region)
          : state.players

      filteredPlayers =
        name !== ''
          ? filteredPlayers.filter((p) =>
              p.alias.toLowerCase().includes(name.toLowerCase())
            )
          : filteredPlayers

      return {
        ...state,
        filteredPlayers: filteredPlayers,
      }
    }

    case SORT_PLAYERS: {
      let sortBy = action.payload

      let players =
        state.filteredPlayers.length > 0 ? state.filteredPlayers : state.players

      switch (sortBy) {
        case 'Name ASC': {
          players.sort((a, b) => (a.alias > b.alias ? 1 : -1))
          break
        }

        case 'Name DESC': {
          players.sort((a, b) => (a.alias > b.alias ? -1 : 1))
          break
        }

        case 'Region ASC': {
          players.sort((a, b) => (a.region > b.region ? 1 : -1))
          break
        }

        case 'Region DESC': {
          players.sort((a, b) => (a.region > b.region ? -1 : 1))
          break
        }

        case 'Default': {
          break
        }

        default: {
          break
        }
      }

      return {
        ...state,
        filteredPlayers: players,
      }
    }

    default: {
      return state
    }
  }
}

export default playerDetailsReducer
