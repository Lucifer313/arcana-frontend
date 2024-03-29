import React, { useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router'
import Moment from 'moment'

import { useSelector, useDispatch } from 'react-redux'
import Footer from '../../components/Layout/User/Footer'
import Header from '../../components/Layout/User/Header'

import { getSquadAddingPermission } from '../../actions/user-action'
import SquadSelector from '../../components/SquadSelector'
import PreviousSquadViewer from '../../components/PreviousSquadViewer'

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
    if (userInfo) {
      if (hour >= 0) {
        dispatch(getSquadAddingPermission(userInfo._id, tid))
      }
    } else {
      history.push('/login')
    }
  }, [allowed, dispatch, tid, userInfo, history])

  //To get tournaments of the current user

  return (
    <>
      <div>
        <Header />
        <Container
          style={{
            minHeight: '82vh',
            backgroundImage: `url(${'/assets/images/user/aegis-ti10.jpg'})`,
          }}
        >
          <Row>
            {allowed ? (
              <SquadSelector navigation={history} />
            ) : (
              <PreviousSquadViewer navigation={history} />
            )}
          </Row>
        </Container>
        <Footer />
      </div>
    </>
  )
}

export default SquadSelectionScreen
