import {
  CREATE_TOURNAMENT_FAILURE,
  CREATE_TOURNAMENT_REQUEST,
  CREATE_TOURNAMENT_RESET,
  CREATE_TOURNAMENT_SUCCESS,
  DELETE_TOURNAMENT_FAILURE,
  DELETE_TOURNAMENT_REQUEST,
  DELETE_TOURNAMENT_RESET,
  DELETE_TOURNAMENT_SUCCESS,
  GET_QUALIFIED_PLAYERS_FAILURE,
  GET_QUALIFIED_PLAYERS_REQUEST,
  GET_QUALIFIED_PLAYERS_SUCCESS,
  GET_QUALIFIED_TEAMS_FAILURE,
  GET_QUALIFIED_TEAMS_REQUEST,
  GET_QUALIFIED_TEAMS_RESET,
  GET_QUALIFIED_TEAMS_SUCCESS,
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

    case DELETE_TOURNAMENT_REQUEST: {
      return {
        ...state,
        deleting: true,
        deleted: false,
        error: false,
      }
    }

    case DELETE_TOURNAMENT_SUCCESS: {
      return {
        ...state,
        deleting: false,
        deleted: true,
        tournaments: state.tournaments.filter(
          (tournament) => tournament._id !== action.payload._id
        ),
        error: false,
      }
    }

    case DELETE_TOURNAMENT_FAILURE: {
      return {
        ...state,
        deleting: false,
        deleted: false,
        error: action.payload,
      }
    }

    case DELETE_TOURNAMENT_RESET: {
      return {
        ...state,
        deleting: false,
        deleted: false,
        error: false,
      }
    }

    case GET_QUALIFIED_PLAYERS_REQUEST: {
      return {
        ...state,
        loading: true,
        loaded: false,
        qualifiedPlayers: [],
        error: false,
      }
    }

    case GET_QUALIFIED_PLAYERS_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        qualifiedPlayers: action.payload,
        error: false,
      }
    }

    case GET_QUALIFIED_PLAYERS_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload,
      }
    }

    case GET_QUALIFIED_TEAMS_REQUEST: {
      return {
        ...state,
        loading: true,
        loaded: false,
        error: false,
      }
    }

    case GET_QUALIFIED_TEAMS_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        qualifiedTeams: action.payload,
        error: false,
      }
    }

    case GET_QUALIFIED_TEAMS_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload,
      }
    }

    case GET_QUALIFIED_TEAMS_RESET: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: false,
      }
    }

    default: {
      return state
    }
  }
}

export default tournamentDetailsReducer
