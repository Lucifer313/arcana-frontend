import {
  CREATE_TEAM_FAILURE,
  CREATE_TEAM_REQUEST,
  CREATE_TEAM_SUCCESS,
  DELETE_TEAM_FAILURE,
  DELETE_TEAM_REQUEST,
  DELETE_TEAM_SUCCESS,
  GET_TEAMS_FAILURE,
  GET_TEAMS_REQUEST,
  GET_TEAMS_SUCCESS,
  UPDATE_TEAM_FAILURE,
  UPDATE_TEAM_REQUEST,
  UPDATE_TEAM_SUCCESS,
} from '../constants/team-constants'

const teamDetailsReducer = (state = { teams: [] }, action) => {
  switch (action.type) {
    case CREATE_TEAM_REQUEST: {
      return {
        ...state,
        success: false,
        loading: true,
      }
    }

    case CREATE_TEAM_SUCCESS: {
      return {
        loading: false,
        success: true,
        teams: [...state.teams, action.payload],
        error: '',
      }
    }

    case CREATE_TEAM_FAILURE: {
      return {
        loading: false,
        success: false,
        error: action.payload,
      }
    }

    case GET_TEAMS_REQUEST: {
      return {
        ...state,
        get_loading: true,
        success: false,
      }
    }

    case GET_TEAMS_SUCCESS: {
      return {
        ...state,
        success: false,
        teams: action.payload,
        get_loading: false,
      }
    }

    case GET_TEAMS_FAILURE: {
      return {
        ...state,
        error: action.payload,
        get_loading: false,
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
        error: action.payload,
        deleted: false,
      }
    }
    default: {
      return state
    }
  }
}

export default teamDetailsReducer
