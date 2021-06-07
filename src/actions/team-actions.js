import axios from '../axios-config'
import {
  CREATE_TEAM_FAILURE,
  CREATE_TEAM_REQUEST,
  CREATE_TEAM_RESET,
  CREATE_TEAM_SUCCESS,
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
  FILTER_TEAMS,
  SORT_TEAMS,
} from '../constants/team-constants'

export const createTeam = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_TEAM_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }

    const { data } = await axios.post('/teams/create', formData, config)

    dispatch({
      type: CREATE_TEAM_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CREATE_TEAM_FAILURE,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const resetTeamCreation = () => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_TEAM_RESET,
    })
  } catch (error) {
    console.log(error)
  }
}

export const getTeams = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_TEAMS_REQUEST,
    })

    const { data } = await axios.get('/teams/')

    dispatch({
      type: GET_TEAMS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_TEAMS_FAILURE,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteTeam = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_TEAM_REQUEST,
    })

    const { data } = await axios.delete(`/teams/${id}/`)

    dispatch({
      type: DELETE_TEAM_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: DELETE_TEAM_FAILURE,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const resetTeamDeletion = () => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_TEAM_RESET,
    })
  } catch (error) {
    console.log(error)
  }
}

export const updateTeam =
  (id, name, region, description, tis_won, creation_date) =>
  async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_TEAM_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axios.patch(
        `/teams/${id}`,
        { name, region, description, tis_won, creation_date },
        config
      )

      dispatch({
        type: UPDATE_TEAM_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: UPDATE_TEAM_FAILURE,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const resetTeamUpdate = () => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_TEAM_RESET,
    })
  } catch (error) {
    console.log(error)
  }
}

export const filterTeams = (region, name) => async (dispatch) => {
  console.log('Region in action: ' + region)
  try {
    dispatch({
      type: FILTER_TEAMS,
      payload: { region, name },
    })
  } catch (error) {
    console.log(error)
  }
}

export const sortTeams = (sortBy) => (dispatch) => {
  try {
    dispatch({
      type: SORT_TEAMS,
      payload: sortBy,
    })
  } catch (error) {
    console.log(error)
  }
}
