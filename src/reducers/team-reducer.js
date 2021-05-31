import {
  CREATE_TEAM_FAILURE,
  CREATE_TEAM_REQUEST,
  CREATE_TEAM_SUCCESS,
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

    default: {
      return state
    }
  }
}

export default teamDetailsReducer
