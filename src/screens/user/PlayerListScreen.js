import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Footer from '../../components/Layout/User/Footer'
import Header from '../../components/Layout/User/Header'

import { useDispatch, useSelector } from 'react-redux'

import './style.css'
import PlayerCard from '../../components/Cards/Player/PlayerCard'
import { getPlayers } from '../../actions/player-action'

const PlayerListScreen = () => {
  const playerDetails = useSelector((state) => state.playerDetails)
  const { players } = playerDetails

  const dispatch = useDispatch()

  useEffect(() => {
    if (players.length === 0) {
      dispatch(getPlayers())
    }
  }, [])

  return (
    <>
      <Header />
      <div className='user-screen-container'>
        <Container>
          <Row>
            {players.map((player) => (
              <Col lg={3} md={6} sm={12}>
                <PlayerCard
                  key={player._id}
                  profile_image={player.profile_image}
                  id={player._id}
                  name={player.alias}
                  role={player.role}
                  team={player.team.name}
                  team_logo={player.team.logo}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  )
}

export default PlayerListScreen
