import React, { useEffect } from 'react'
import { Container, Row, Tabs, Tab } from 'react-bootstrap'
import { useParams } from 'react-router'
import Moment from 'moment'

import { useSelector, useDispatch } from 'react-redux'
import Footer from '../../components/Layout/User/Footer'
import Header from '../../components/Layout/User/Header'

import SquadSelector from '../../components/SquadSelector'
import PreviousSquadViewer from '../../components/PreviousSquadViewer'

import { getSquadAddingPermission } from '../../actions/user-action'

const SquadSelectionScreen = ({ history }) => {
  //const [reserveSquad, setReserveSquad] = useState([])

  const TABSTYLES = { width: '50%' }

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
  }, [allowed, dispatch, tid, userInfo._id])

  //To get tournaments of the current user

  return (
    <div>
      <>
        <Header />
        <div>
          <Tabs
            defaultActiveKey='selectSquad'
            transition={false}
            id='noanim-tab-example'
            className='mb-3'
          >
            <Tab
              eventKey='selectSquad'
              title='Select New Squad'
              className={TABSTYLES}
            >
              <Container style={{ minHeight: '82vh' }}>
                <Row>
                  <SquadSelector navigation={history} allowed={allowed} />
                </Row>
              </Container>
            </Tab>
            <Tab eventKey='previousSquad' title='View Previous Squad'>
              <Container style={{ minHeight: '82vh' }}>
                <Row>
                  <PreviousSquadViewer navigation={history} />
                </Row>
              </Container>
            </Tab>
          </Tabs>
        </div>

        <Footer />
      </>
    </div>
  )
}

export default SquadSelectionScreen
