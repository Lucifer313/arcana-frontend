import {
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
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../constants/user-constants'

const userDetailsReducer = (
  state = { userInfo: {}, myTournaments: [], allowed: false },
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

    case USER_REGISTER_REQUEST: {
      return { ...state, registering: true, registered: false }
    }

    case USER_REGISTER_SUCCESS: {
      return {
        ...state,
        registering: false,
        registered: true,
        userInfo: action.payload,
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
        playingSquad: action.payload,
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
        allowed: false,
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

    case USER_LOGOUT: {
      return {
        userInfo: null,
        myTournaments: [],
      }
    }
    default: {
      return state
    }
  }
}

export default userDetailsReducer
