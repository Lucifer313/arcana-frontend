import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Container, Row, Col, Table } from 'react-bootstrap'

import Footer from '../../components/Layout/User/Footer'
import Header from '../../components/Layout/User/Header'
import { useParams } from 'react-router-dom'
import { getPlayerLeaderboard } from '../../actions/tournament-action'
import Loader from '../../components/Loader'
import Logo from '../../components/Logo'

const PlayerLeaderboardScreen = ({ history }) => {
  const dispatch = useDispatch()

  const tournamentDetails = useSelector((state) => state.tournamentDetails)
  const { loading, error, playerLeaderboard } = tournamentDetails

  const userDetails = useSelector((state) => state.userDetails)
  const { userInfo } = userDetails

  //Getting the tournamentId
  const { tid } = useParams()

  //declaring the counter variable for ranking
  let counter = 1
  useEffect(() => {
    dispatch(getPlayerLeaderboard(tid))
  }, [])

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
  }, [history, userInfo])

  return (
    <>
      <Header />
      <h5 className='p-2 m-0 leaderboard-banner'>Leaderboard</h5>
      <Container
        style={{
          backgroundImage: `url(${'/assets/images/user/aegis-ti10.jpg'})`,
        }}
      >
        <Row>
          <Col>
            {loading ? (
              <Loader />
            ) : (
              <div style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                <Table striped>
                  <thead
                    style={{
                      position: 'sticky',
                      top: '0',
                      zIndex: '1000',
                      background: 'black',
                    }}
                  >
                    <tr className='leaderboard-row'>
                      <th>Rank</th>
                      <th>Avatar</th>
                      <th>Name</th>
                      <th>Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {playerLeaderboard.map((player) => (
                      <tr className='leaderboard-row'>
                        <td>{counter++}</td>
                        <td>
                          <Logo path={player.profile_image} />
                        </td>
                        <td>{player.alias}</td>
                        <td>
                          {Math.round(player.tournaments.total_points * 100) /
                            100}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  )
}

export default PlayerLeaderboardScreen
