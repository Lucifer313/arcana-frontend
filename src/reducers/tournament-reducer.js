import {
  CREATE_TOURNAMENT_FAILURE,
  CREATE_TOURNAMENT_REQUEST,
  CREATE_TOURNAMENT_RESET,
  CREATE_TOURNAMENT_SUCCESS,
  GET_TOURNAMENTS_FAILURE,
  GET_TOURNAMENTS_REQUEST,
  GET_TOURNAMENTS_SUCCESS,
} from '../constants/tournament-constants'

const tournamentDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_TOURNAMENT_REQUEST: {
      return {
        ...state,
        creating: true,
        created: false,
        error: false,
      }
    }

    case CREATE_TOURNAMENT_SUCCESS: {
      return {
        ...state,
        creating: false,
        created: true,
        error: false,
        tournaments: [...state.tournaments, action.payload],
      }
    }

    case CREATE_TOURNAMENT_FAILURE: {
      return {
        ...state,
        creating: false,
        created: false,
        error: action.payload,
      }
    }

    case CREATE_TOURNAMENT_RESET: {
      return {
        ...state,
        creating: false,
        created: false,
        error: false,
      }
    }

    case GET_TOURNAMENTS_REQUEST: {
      return {
        ...state,
        loading: true,
        loaded: false,
        error: false,
      }
    }

    case GET_TOURNAMENTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
        tournaments: action.payload,
      }
    }

    case GET_TOURNAMENTS_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload,
      }
    }

    default: {
      return state
    }
  }
}

export default tournamentDetailsReducer
