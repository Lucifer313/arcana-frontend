import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Footer from '../../components/Layout/User/Footer'
import Header from '../../components/Layout/User/Header'

import { useDispatch, useSelector } from 'react-redux'

import './style.css'
import TeamCard from '../../components/Cards/Team/TeamCard'
import { getTeams } from '../../actions/team-actions'

const TeamListScreen = () => {
  const teamDetails = useSelector((state) => state.teamDetails)
  const { teams } = teamDetails

  const dispatch = useDispatch()

  useEffect(() => {
    if (teams.length === 0) {
      dispatch(getTeams())
    }
  }, [])

  return (
    <>
      <Header />
      <div className='user-screen-container'>
        <Container>
          <Row>
            {teams.map((team) => (
              <Col lg={3} md={6} sm={12}>
                <TeamCard
                  key={team._id}
                  logo={team.logo}
                  id={team._id}
                  name={team.name}
                  region={team.region}
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

export default TeamListScreen
