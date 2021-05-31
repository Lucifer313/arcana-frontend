import axios from '../axios-config'

import {
  ADMIN_LOGIN_FAILURE,
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  USER_LOGOUT,
} from '../constants/admin-constants'

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_LOGIN_REQUEST,
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
      type: ADMIN_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    console.log(error)
    dispatch({
      type: ADMIN_LOGIN_FAILURE,
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
