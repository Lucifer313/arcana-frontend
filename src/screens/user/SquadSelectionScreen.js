import React, { useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router'
import Moment from 'moment'

import { useSelector, useDispatch } from 'react-redux'
import Footer from '../../components/Layout/User/Footer'
import Header from '../../components/Layout/User/Header'

import SquadSelector from '../../components/SquadSelector'
import PreviousSquadViewer from '../../components/PreviousSquadViewer'

import { getQualifiedPlayers } from '../../actions/tournament-action'
import {
  getMyTournaments,
  getSquadAddingPermission,
} from '../../actions/user-action'

const SquadSelectionScreen = ({ history }) => {
  //const [reserveSquad, setReserveSquad] = useState([])

  const dispatch = useDispatch()

  const { tid } = useParams()

  const userDetails = useSelector((state) => state.userDetails)
  const { userInfo, allowed } = userDetails

  //Adding a player to the squad selection

  //Parent level
  useEffect(() => {
    const now = Moment()
    const hour = now.hour()
    //alert(hour)
    if (hour >= 0) {
      dispatch(getSquadAddingPermission(userInfo._id, tid))
    }
  }, [])

  //To get tournaments of the current user
  useEffect(() => {
    dispatch(getMyTournaments(userInfo._id))
  }, [userInfo, dispatch])

  // To get the qualified players list for the selected tournament
  useEffect(() => {
    dispatch(getQualifiedPlayers(tid))
  }, [history, dispatch, tid])

  return (
    <div>
      <>
        <Header />
        {!allowed ? (
          <p
            className='text-center p-1'
            style={{ background: 'red', color: 'white', fontWeight: '400' }}
          >
            Squads can only be submitted between 9:00 PM and 9:00 AM
          </p>
        ) : null}
        <Container style={{ minHeight: '82vh' }}>
          <Row>
            {allowed ? (
              <SquadSelector navigation={history} />
            ) : (
              <PreviousSquadViewer navigation={history} />
            )}
          </Row>
        </Container>
        <Footer />
      </>
    </div>
  )
}

export default SquadSelectionScreen
