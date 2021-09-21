import {
  ADD_PLAYER_TO_SQUAD,
  ADD_PLAYING_SQUAD_FAILURE,
  ADD_PLAYING_SQUAD_REQUEST,
  ADD_PLAYING_SQUAD_SUCCESS,
  CHECK_SQUAD_PERMISSION_FAILURE,
  CHECK_SQUAD_PERMISSION_REQUEST,
  CHECK_SQUAD_PERMISSION_SUCCESS,
  CREATE_ARCANA_TEAM_FAILURE,
  CREATE_ARCANA_TEAM_REQUEST,
  CREATE_ARCANA_TEAM_RESET,
  CREATE_ARCANA_TEAM_SUCCESS,
  GET_MY_TOURNAMENTS_FAILURE,
  GET_MY_TOURNAMENTS_REQUEST,
  GET_MY_TOURNAMENTS_SUCCESS,
  GET_SQUAD_BY_DAY_FAILURE,
  GET_SQUAD_BY_DAY_REQUEST,
  GET_SQUAD_BY_DAY_RESET,
  GET_SQUAD_BY_DAY_SUCCESS,
  REMOVE_PLAYER_FROM_SQUAD,
  RESET_PLAYER_SQUAD,
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_RESET,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_FAILURE,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_RESET,
  USER_LOGIN_RESET,
  FORGOT_PASSWORD_FAILURE,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_RESET,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_RESET,
} from '../constants/user-constants'

const userDetailsReducer = (
  state = {
    userInfo: {},
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
  action
) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST: {
      return {
        ...state,
        loading: true,
      }
    }

    case USER_LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
      }
    }

    case USER_LOGIN_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    }

    case USER_LOGIN_RESET: {
      return {
        ...state,
        loading: false,
        error: false,
      }
    }

    case USER_REGISTER_REQUEST: {
      return { ...state, registering: true, registered: false }
    }

    case USER_REGISTER_SUCCESS: {
      return {
        ...state,
        registering: false,
        registered: true,
        //userInfo: action.payload,
        error: false,
      }
    }

    case USER_REGISTER_FAILURE: {
      return {
        ...state,
        registering: false,
        registered: false,
        error: action.payload,
      }
    }

    case USER_REGISTER_RESET: {
      return {
        ...state,
        registering: false,
        registered: false,
        error: false,
      }
    }

    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        loading: true,
        loaded: false,
        error: false,
      }
    }

    case FORGOT_PASSWORD_RESET: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: false,
      }
    }

    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
      }
    }

    case FORGOT_PASSWORD_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload,
      }
    }

    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetting: true,
        reset: false,
        error: false,
      }
    }

    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetting: false,
        reset: true,
        error: false,
      }
    }

    case RESET_PASSWORD_FAILURE: {
      return {
        ...state,
        resetting: false,
        reset: false,
        error: action.payload,
      }
    }

    case RESET_PASSWORD_RESET: {
      return {
        ...state,
        resetting: false,
        reset: false,
        error: false,
      }
    }

    case USER_UPDATE_REQUEST: {
      return {
        ...state,
        updating: true,
        updated: false,
        error: false,
      }
    }

    case USER_UPDATE_SUCCESS: {
      return {
        ...state,
        updating: false,
        updated: true,
        userInfo: action.payload,
        error: false,
      }
    }

    case USER_UPDATE_FAILURE: {
      return {
        ...state,
        updating: false,
        updated: false,
        error: action.payload,
      }
    }

    case USER_UPDATE_RESET: {
      return {
        ...state,
        updating: false,
        updated: false,
        error: false,
      }
    }

    case CREATE_ARCANA_TEAM_REQUEST: {
      return {
        ...state,
        creating: true,
        created: false,
        error: false,
      }
    }

    case CREATE_ARCANA_TEAM_SUCCESS: {
      return {
        ...state,
        creating: false,
        created: true,
        arcanaTeam: action.payload,
      }
    }

    case CREATE_ARCANA_TEAM_FAILURE: {
      return {
        ...state,
        creating: false,
        created: false,
        error: action.payload,
      }
    }

    case CREATE_ARCANA_TEAM_RESET: {
      return {
        ...state,
        creating: false,
        created: false,
        error: false,
      }
    }

    case GET_MY_TOURNAMENTS_REQUEST: {
      return {
        ...state,
        loading: true,
        loaded: false,
        error: false,
      }
    }

    case GET_MY_TOURNAMENTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        myTournaments: action.payload,
        error: false,
      }
    }

    case GET_MY_TOURNAMENTS_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload,
      }
    }

    case ADD_PLAYING_SQUAD_REQUEST: {
      return {
        ...state,
        adding: true,
        added: false,
        error: false,
      }
    }

    case ADD_PLAYING_SQUAD_SUCCESS: {
      return {
        ...state,
        adding: false,
        added: true,
        error: false,
      }
    }

    case ADD_PLAYING_SQUAD_FAILURE: {
      return {
        ...state,
        adding: false,
        added: false,
        error: action.payload,
      }
    }

    case CHECK_SQUAD_PERMISSION_REQUEST: {
      return {
        ...state,
        checking: true,
        checked: false,
      }
    }

    case CHECK_SQUAD_PERMISSION_SUCCESS: {
      return {
        ...state,
        checking: false,
        checked: true,
        allowed: action.payload,
      }
    }

    case CHECK_SQUAD_PERMISSION_FAILURE: {
      return {
        ...state,
        checking: false,
        checked: false,
        error: action.payload,
      }
    }

    case GET_SQUAD_BY_DAY_REQUEST: {
      return {
        ...state,
        loading: true,
        loaded: false,
      }
    }

    case GET_SQUAD_BY_DAY_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        previousSquad: action.payload,
      }
    }

    case GET_SQUAD_BY_DAY_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload,
      }
    }

    case GET_SQUAD_BY_DAY_RESET: {
      return {
        ...state,
        previousSquad: {
          playingSquad: [],
          playingSquadIds: [],
          reserveSquad: [],
          reserveSquadIds: [],
        },
        newPlayingSquad: [],
      }
    }

    case ADD_PLAYER_TO_SQUAD: {
      return {
        ...state,
        newPlayingSquad: [...state.newPlayingSquad, action.payload],
      }
    }

    case REMOVE_PLAYER_FROM_SQUAD: {
      let updatedPlayingSquad = state.newPlayingSquad.filter(
        (p) => p !== action.payload
      )

      return {
        ...state,
        newPlayingSquad: updatedPlayingSquad,
      }
    }

    case RESET_PLAYER_SQUAD: {
      return {
        ...state,
        newPlayingSquad: state.previousSquad.playingSquadIds,
      }
    }

    case USER_LOGOUT: {
      return {
        ...state,
        loading: false,
        loaded: false,
        userInfo: null,
        allowed: false,
        error: false,

        previousSquad: {
          playingSquad: [],
          playingSquadIds: [],
          reserveSquad: [],
          reserveSquadIds: [],
        },

        newPlayingSquad: [],
      }
    }
    default: {
      return state
    }
  }
}

export default userDetailsReducer
