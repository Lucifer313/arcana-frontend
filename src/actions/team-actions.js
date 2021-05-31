import axios from '../axios-config'
import {
  CREATE_TEAM_FAILURE,
  CREATE_TEAM_REQUEST,
  CREATE_TEAM_SUCCESS,
} from '../constants/team-constants'

export const createTeam =
  (name, region, description, tis_won, creation_date) => async (dispatch) => {
    try {
      dispatch({
        type: CREATE_TEAM_REQUEST,
      })

      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      }

      const { data } = await axios.post(
        '/teams/create',
        { name, region, description, tis_won, creation_date },
        config
      )

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
