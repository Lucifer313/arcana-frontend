import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { useSelector } from 'react-redux'
import Header from '../../components/Layout/User/Header'
import Footer from '../../components/Layout/User/Footer'

const PlayerDetailScreen = ({ match }) => {
  const playerDetails = useSelector((state) => state.playerDetails)
  const { players } = playerDetails

  const [name, setName] = useState('')
  const [profileImage, setProfileImage] = useState('')
  const [country, setCountry] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [role, setRole] = useState('')
  const [prizeMoney, setPrizeMoney] = useState('')
  const [team, setTeam] = useState('')
  const [alias, setAlias] = useState('')
  const [teamLogo, setTeamLogo] = useState('')

  useEffect(() => {
    const getTeamById = async () => {
      let player
      if (players.length > 0) {
        //Since filter returns an array we only need first indexed object hence 0
        player = await players.filter(
          (player) => player._id === match.params.id
        )[0]
        setName(player.name)
        setAlias(player.alias)
        setRole(player.role)
        setBirthDate(player.date_of_birth)
        setPrizeMoney(player.prize_money)
        setCountry(player.country)
        setProfileImage(player.profile_image)
        setTeam(player.team.name)
        setTeamLogo(player.team.logo)
      }
    }

    getTeamById()
  }, [])

  return (
    <>
      <Header />
      <div className='team-detail-container'>
        <Container
          style={{ minHeight: '82vh' }}
          className='team-detail-container'
        >
          <Row>
            <Col className='offset-lg-2' lg={10} sm={12}>
              <h3 className='achievements-team-title'>
                <LinkContainer to='/players'>
                  <span className='team-details-back-arrow'>
                    <i class='fas fa-arrow-circle-left'></i>
                  </span>
                </LinkContainer>
                {'  '}
                {alias}
              </h3>
            </Col>
          </Row>
          <Row>
            <Col className='offset-lg-2' lg={3} md={6} sm={12}>
              <div class='team-logo-container'>
                <img
                  src={`http://localhost:7000/${profileImage}`}
                  alt='team-logo'
                  className='team-detail-logo'
                />
              </div>

              <div className='details-achievements'>
                <h5 className='achievements-title'>Achievements</h5>
                <div className='achievements-desc'>Test data</div>
              </div>
            </Col>
            <Col lg={5} md={6} sm={12}>
              <div className='details-side-sect'>
                <table>
                  <tr>
                    <td className='detail-label'>Name:</td>
                    <td>{name}</td>
                  </tr>
                  <tr>
                    <td className='detail-label'>Role:</td>
                    <td>{role}</td>
                  </tr>
                  <tr>
                    <td className='detail-label'>Team:</td>
                    <td>{team}</td>
                  </tr>
                  <tr>
                    <td className='detail-label'>Country:</td>
                    <td>{country}</td>
                  </tr>
                  <tr>
                    <td className='detail-label'>Birth Date:</td>
                    <td>{birthDate}</td>
                  </tr>
                  <tr>
                    <td className='detail-label'>Prize Money:</td>
                    <td>${prizeMoney}</td>
                  </tr>
                </table>
                <hr />
                <h5 className='details-achievements-desc-title'>Bio:</h5>
                <div className='details-description'>Test Description</div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  )
}

export default PlayerDetailScreen
