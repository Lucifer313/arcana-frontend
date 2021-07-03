import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Footer from '../../components/Layout/User/Footer'
import Header from '../../components/Layout/User/Header'
import { LinkContainer } from 'react-router-bootstrap'

import { useParams } from 'react-router'
import { getMyTournaments } from '../../actions/user-action'
import { getQualifiedPlayers } from '../../actions/tournament-action'

const TournamentDetailScreen = () => {
  const userDetails = useSelector((state) => state.userDetails)
  const { userInfo } = userDetails

  const { tid } = useParams()

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getMyTournaments(userInfo._id))
    dispatch(getQualifiedPlayers(tid))
  }, [])

  return (
    <div>
      <Header />
      <Container style={{ minHeight: '81vh' }}>
        <Row>
          <Col lg={6} sm={12} style={{ padding: '0' }}>
            <LinkContainer
              to={`/tournaments/${tid}/squad-selection/`}
              style={{
                width: '100%',
                minHeight: '27vh',
                backgroundColor: '#4caf50',
              }}
            >
              <Button variant='warning' style={{}}>
                <i
                  class='fas fa-users'
                  style={{
                    fontSize: '3.5em',
                    width: '100%',
                    marginTop: '15px',
                  }}
                ></i>{' '}
                <p
                  style={{
                    fontSize: '1.5em',
                    fontWeight: '600',
                    margin: '20px',
                  }}
                >
                  Squad Selection
                </p>
              </Button>
            </LinkContainer>
          </Col>
          <Col lg={6} sm={12} style={{ padding: '0' }}>
            <LinkContainer
              to='/'
              style={{
                width: '100%',
                minHeight: '27vh',
                backgroundColor: '#ff9800',
              }}
            >
              <Button variant='warning' style={{}}>
                <i
                  class='fas fa-calendar-alt'
                  style={{
                    fontSize: '3.5em',
                    width: '100%',
                    marginTop: '15px',
                  }}
                ></i>{' '}
                <p
                  style={{
                    fontSize: '1.5em',
                    fontWeight: '600',
                    margin: '20px',
                  }}
                >
                  UPCOMING SCHEDULE
                </p>
              </Button>
            </LinkContainer>
          </Col>
          <Col lg={12} style={{ padding: '0' }}>
            <LinkContainer
              to='/'
              style={{
                width: '100%',
                minHeight: '27vh',
                backgroundColor: '#e51c23',
              }}
            >
              <Button variant='warning' style={{}}>
                <i
                  class='fas fa-chart-line'
                  style={{
                    fontSize: '3.5em',
                    width: '100%',
                    marginTop: '15px',
                  }}
                ></i>{' '}
                <p
                  style={{
                    fontSize: '1.5em',
                    fontWeight: '600',
                    margin: '20px',
                  }}
                >
                  LEADERBOARD
                </p>
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
