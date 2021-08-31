import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Container, Row, Col, Table } from 'react-bootstrap'

import Footer from '../../components/Layout/User/Footer'
import Header from '../../components/Layout/User/Header'
import { useParams } from 'react-router-dom'
import { getPlayerLeaderboard } from '../../actions/tournament-action'
import Loader from '../../components/Loader'
import Logo from '../../components/Logo'

const PlayerLeaderboardScreen = () => {
  const dispatch = useDispatch()

  const tournamentDetails = useSelector((state) => state.tournamentDetails)
  const { loading, error, playerLeaderboard } = tournamentDetails

  //Getting the tournamentId
  const { tid } = useParams()

  //declaring the counter variable for ranking
  let counter = 1
  useEffect(() => {
    dispatch(getPlayerLeaderboard(tid))
  }, [])

  return (
    <>
      <Header />
      <h5
        style={{ textAlign: 'center', color: 'white', backgroundColor: 'red' }}
        className='p-2'
      >
        Player Leaderboard
      </h5>
      <Container>
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
                      backgroundColor: 'white',
                      zIndex: '1000',
                    }}
                  >
                    <tr>
                      <th>Rank</th>
                      <th>Avatar</th>
                      <th>Name</th>
                      <th>Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {playerLeaderboard.map((player) => (
                      <tr>
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
