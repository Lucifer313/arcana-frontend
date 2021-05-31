import {
  ADMIN_LOGIN_FAILURE,
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  USER_LOGOUT,
} from '../constants/admin-constants'

const userDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_LOGIN_REQUEST: {
      return {
        loading: true,
      }
    }

    case ADMIN_LOGIN_SUCCESS: {
      return {
        loading: false,
        userInfo: action.payload,
      }
    }

    case ADMIN_LOGIN_FAILURE: {
      return {
        loading: false,
        error: action.payload,
      }
    }

    case USER_LOGOUT: {
      return {
        userDetails: {},
      }
    }

    default: {
      return state
    }
  }
}

export default userDetailsReducer
