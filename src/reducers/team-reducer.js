import {
  CREATE_TEAM_FAILURE,
  CREATE_TEAM_REQUEST,
  CREATE_TEAM_SUCCESS,
  CREATE_TEAM_RESET,
  DELETE_TEAM_FAILURE,
  DELETE_TEAM_REQUEST,
  DELETE_TEAM_SUCCESS,
  DELETE_TEAM_RESET,
  GET_TEAMS_FAILURE,
  GET_TEAMS_REQUEST,
  GET_TEAMS_SUCCESS,
  UPDATE_TEAM_FAILURE,
  UPDATE_TEAM_REQUEST,
  UPDATE_TEAM_SUCCESS,
  UPDATE_TEAM_RESET,
} from '../constants/team-constants'

const teamDetailsReducer = (state = { teams: [] }, action) => {
  switch (action.type) {
    case CREATE_TEAM_REQUEST: {
      return {
        ...state,
        created: false,
        creating: true,
      }
    }

    case CREATE_TEAM_SUCCESS: {
      return {
        creating: false,
        created: true,
        teams: [...state.teams, action.payload],
        error: '',
      }
    }

    case CREATE_TEAM_FAILURE: {
      return {
        ...state,
        creating: false,
        created: false,
        error: action.payload,
      }
    }

    case CREATE_TEAM_RESET: {
      return {
        ...state,
        created: false,
        error: '',
      }
    }

    case GET_TEAMS_REQUEST: {
      return {
        ...state,
        loading: true,
        loaded: false,
        teams: [],
        error: '',
      }
    }

    case GET_TEAMS_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        teams: action.payload,
        error: '',
      }
    }

    case GET_TEAMS_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false,
        teams: [],
        error: action.payload,
      }
    }

    case UPDATE_TEAM_REQUEST: {
      return {
        ...state,
        updating: true,
        updated: false,
      }
    }

    case UPDATE_TEAM_SUCCESS: {
      const updatedTeams = state.teams.filter(
        (team) => team._id !== action.payload._id
      )

      return {
        ...state,
        updating: false,
        updated: true,
        teams: [...updatedTeams, action.payload],
      }
    }

    case UPDATE_TEAM_FAILURE: {
      return {
        ...state,
        updating: false,
        updated: false,
        error: action.payload,
      }
    }

    case UPDATE_TEAM_RESET: {
      return {
        ...state,
        updated: false,
        error: '',
      }
    }

    case DELETE_TEAM_REQUEST: {
      return {
        ...state,
        deleting: true,
        deleted: false,
      }
    }

    case DELETE_TEAM_SUCCESS: {
      return {
        teams: state.teams.filter((team) => team._id !== action.payload._id),
        deleting: false,
        deleted: true,
      }
    }

    case DELETE_TEAM_FAILURE: {
      return {
        ...state,
        deleting: false,
        deleted: false,
        error: action.payload,
      }
    }

    case DELETE_TEAM_RESET: {
      return {
        ...state,
        deleted: false,
        error: '',
      }
    }
    default: {
      return state
    }
  }
}

export default teamDetailsReducer
