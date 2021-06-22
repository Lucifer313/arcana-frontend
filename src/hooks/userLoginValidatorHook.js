import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTeams } from '../actions/team-actions'

const useLoginValidation = (history) => {
  const userDetails = useSelector((state) => state.userDetails)
  const { userInfo } = userDetails
  const dispatch = useDispatch()
  useEffect(() => {
    if (userInfo === null) {
      history.push('/login')
    } else {
      dispatch(getTeams())
    }
  }, [userInfo, history, dispatch])
}

export default useLoginValidation
