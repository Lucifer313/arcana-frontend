import axios from '../axios-config'
import { GET_QUALIFIED_PLAYERS_REQUEST } from '../constants/tournament-constants'

import {
  ADD_PLAYING_SQUAD_FAILURE,
  ADD_PLAYING_SQUAD_REQUEST,
  ADD_PLAYING_SQUAD_SUCCESS,
  CHECK_SQUAD_PERMISSION_FAILURE,
  CHECK_SQUAD_PERMISSION_REQUEST,
  CHECK_SQUAD_PERMISSION_SUCCESS,
  CREATE_ARCANA_TEAM_FAILURE,
  CREATE_ARCANA_TEAM_REQUEST,
  CREATE_ARCANA_TEAM_SUCCESS,
  GET_MY_TOURNAMENTS_FAILURE,
  GET_MY_TOURNAMENTS_REQUEST,
  GET_MY_TOURNAMENTS_SUCCESS,
  GET_SQUAD_BY_DAY_FAILURE,
  GET_SQUAD_BY_DAY_REQUEST,
  GET_SQUAD_BY_DAY_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../constants/user-constants'

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })

    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/users/login',
      { email, password },
      config
    )

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    console.log(error)
    dispatch({
      type: USER_LOGIN_FAILURE,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const register = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }

    const { data } = await axios.post('/users/register', formData, config)

    localStorage.setItem('userInfo', JSON.stringify(data))

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAILURE,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
    console.log(error)
  }
}

export const createArcanaTeam =
  (tournamentId, userId, teamPrediction, arcanaTeam) => async (dispatch) => {
    try {
      dispatch({
        type: CREATE_ARCANA_TEAM_REQUEST,
      })

      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      }

      const { data } = axios.post(
        `/users/tournaments/${tournamentId}/createArcanaTeam`,
        { userId, teamPrediction, arcanaTeam },
        config
      )

      dispatch({
        type: CREATE_ARCANA_TEAM_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: CREATE_ARCANA_TEAM_FAILURE,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const getMyTournaments = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_MY_TOURNAMENTS_REQUEST,
    })

    const { data } = await axios.get(`/users/${userId}/my-tournaments/`)

    dispatch({
      type: GET_MY_TOURNAMENTS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_MY_TOURNAMENTS_FAILURE,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const submitPlayingSquad =
  (userId, tournamentId, playingSquad, reserveSquad, addedAt) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ADD_PLAYING_SQUAD_REQUEST,
      })

      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      }

      const { data } = await axios.post(
        `/users/${userId}/add-playing-squad/`,
        { tournamentId, playingSquad, reserveSquad, addedAt },
        config
      )

      dispatch({
        type: ADD_PLAYING_SQUAD_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: ADD_PLAYING_SQUAD_FAILURE,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const getSquadAddingPermission =
  (userId, tournamentId) => async (dispatch) => {
    try {
      dispatch({
        type: CHECK_SQUAD_PERMISSION_REQUEST,
      })

      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      }

      const { data } = await axios.post(
        `/users/${userId}/allow-adding-squad`,
        { tournamentId },
        config
      )

      dispatch({
        type: CHECK_SQUAD_PERMISSION_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: CHECK_SQUAD_PERMISSION_FAILURE,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const getSquadByDay =
  (userId, tournamentId, day, mode) => async (dispatch) => {
    try {
      dispatch({ type: GET_SQUAD_BY_DAY_REQUEST })

      const { data } = await axios.post(`/users/${userId}/get-squad-by-day`, {
        tournamentId,
        day,
        mode,
      })

      dispatch({
        type: GET_SQUAD_BY_DAY_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: GET_SQUAD_BY_DAY_FAILURE,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const logout = () => (dispatch) => {
  //Clearing localstorage first
  localStorage.removeItem('userInfo')

  try {
    dispatch({
      type: USER_LOGOUT,
    })
  } catch (error) {
    console.log(error)
  }
}
