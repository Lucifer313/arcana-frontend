import axios from '../axios-config'

import {
  CREATE_PLAYER_FAILURE,
  CREATE_PLAYER_REQUEST,
  CREATE_PLAYER_SUCCESS,
  DELETE_PLAYER_FAILURE,
  DELETE_PLAYER_REQUEST,
  DELETE_PLAYER_SUCCESS,
  FILTER_PLAYERS,
  GET_PLAYERS_FAILURE,
  GET_PLAYERS_REQUEST,
  GET_PLAYERS_SUCCESS,
  SORT_PLAYERS,
  UPDATE_PLAYER_FAILURE,
  UPDATE_PLAYER_REQUEST,
  UPDATE_PLAYER_SUCCESS,
} from '../constants/player-constants'

export const getPlayers = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_PLAYERS_REQUEST,
    })

    const { data } = await axios.get('/players/')

    dispatch({
      type: GET_PLAYERS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_PLAYERS_FAILURE,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createPlayer = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_PLAYER_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }

    const { data } = await axios.post(
      '/players/create-player',
      formData,
      config
    )

    dispatch({
      type: CREATE_PLAYER_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CREATE_PLAYER_FAILURE,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updatePlayer = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_PLAYER_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }

    const { data } = await axios.patch(`/players/${id}`, formData, config)

    dispatch({
      type: UPDATE_PLAYER_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: UPDATE_PLAYER_FAILURE,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deletePlayer = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_PLAYER_REQUEST,
    })

    const { data } = await axios.delete(`/players/${id}`)

    dispatch({
      type: DELETE_PLAYER_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: DELETE_PLAYER_FAILURE,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const filterPlayers = (region, name) => async (dispatch) => {
  try {
    dispatch({
      type: FILTER_PLAYERS,
      payload: { region, name },
    })
  } catch (error) {
    console.log(error)
  }
}

export const sortPlayers = (sortBy) => (dispatch) => {
  try {
    dispatch({
      type: SORT_PLAYERS,
      payload: sortBy,
    })
  } catch (error) {
    console.log(error)
  }
}
