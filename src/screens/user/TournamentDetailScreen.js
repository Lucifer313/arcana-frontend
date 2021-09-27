import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Container, Row, Col, Button } from 'react-bootstrap'
import Footer from '../../components/Layout/User/Footer'
import Header from '../../components/Layout/User/Header'
import { LinkContainer } from 'react-router-bootstrap'

import { useParams } from 'react-router'
import { getMyTournaments } from '../../actions/user-action'
import { getQualifiedPlayers } from '../../actions/tournament-action'

const TournamentDetailScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { userInfo } = userDetails

  const { tid } = useParams()

  useEffect(() => {
    dispatch(getMyTournaments(userInfo._id))
    dispatch(getQualifiedPlayers(tid))
  }, [])

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
  }, [history, userInfo])

  return (
    <div>
      <Header />
      <Container style={{ minHeight: '81vh' }}>
        <Row>
          <Col
            lg={6}
            sm={12}
            style={{ padding: '0', borderBottom: '2px solid #DCB570' }}
          >
            <LinkContainer
              to={`/tournaments/${tid}/squad-selection/`}
              style={{
                width: '100%',
                minHeight: '27vh',
                backgroundColor: 'black',
              }}
            >
              <Button variant='warning' style={{}}>
                <i className='fas fa-users tournament-detail-btn-icon'></i>{' '}
                <p className='tournament-detail-btn-text'>Squad Selection</p>
              </Button>
            </LinkContainer>
          </Col>
          <Col
            lg={6}
            sm={12}
            style={{ padding: '0', borderBottom: '2px solid #DCB570' }}
          >
            <LinkContainer
              to={`/tournaments/${tid}/arcana-leaderboard`}
              style={{
                width: '100%',
                minHeight: '27vh',
                backgroundColor: 'black',
              }}
            >
              <Button variant='warning' style={{}}>
                <i className='fas fa-calendar-alt tournament-detail-btn-icon'></i>{' '}
                <p className='tournament-detail-btn-text'>UPCOMING SCHEDULE</p>
              </Button>
            </LinkContainer>
          </Col>
          <Col
            lg={12}
            style={{ padding: '0', borderBottom: '2px solid #DCB570' }}
          >
            <LinkContainer
              to={`/tournaments/${tid}/arcana-leaderboard`}
              style={{
                width: '100%',
                minHeight: '27vh',
                backgroundColor: 'black',
              }}
            >
              <Button variant='warning' style={{}}>
                <i className='fab fa-autoprefixer tournament-detail-btn-icon'></i>{' '}
                <p className='tournament-detail-btn-text'>ARCANA LEADERBOARD</p>
              </Button>
            </LinkContainer>
          </Col>
          <Col
            lg={12}
            style={{ padding: '0', borderBottom: '2px solid #DCB570' }}
          >
            <LinkContainer
              to={`/tournaments/${tid}/player-leaderboard`}
              style={{
                width: '100%',
                minHeight: '27vh',
                backgroundColor: 'black',
              }}
            >
              <Button variant='success' style={{}}>
                <i className='fas fa-chart-line tournament-detail-btn-icon'></i>{' '}
                <p className='tournament-detail-btn-text'>PLAYER LEADERBOARD</p>
              </Button>
            </LinkContainer>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  )
}

export default TournamentDetailScreen
