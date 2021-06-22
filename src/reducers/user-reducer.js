import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../constants/user-constants'

const userDetailsReducer = (state = { userInfo: {} }, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST: {
      return {
        loading: true,
      }
    }

    case USER_LOGIN_SUCCESS: {
      return {
        loading: false,
        userInfo: action.payload,
      }
    }

    case USER_LOGIN_FAILURE: {
      return {
        loading: false,
        error: action.payload,
      }
    }

    case USER_REGISTER_REQUEST: {
      return { ...state, registering: true, registered: false }
    }

    case USER_REGISTER_SUCCESS: {
      return {
        ...state,
        registering: false,
        registered: true,
        userInfo: action.payload,
        error: false,
      }
    }

    case USER_REGISTER_FAILURE: {
      return {
        ...state,
        registering: false,
        registered: false,
        error: action.payload,
      }
    }

    case USER_LOGOUT: {
      return {
        userInfo: null,
      }
    }
    default: {
      return state
    }
  }
}

export default userDetailsReducer
