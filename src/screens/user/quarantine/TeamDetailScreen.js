import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { useSelector } from 'react-redux'
import Header from '../../../components/Layout/User/Header'
import Footer from '../../../components/Layout/User/Footer'

const TeamDetailScreen = ({ match }) => {
  const teamDetails = useSelector((state) => state.teamDetails)
  const { teams } = teamDetails

  const [name, setName] = useState('')
  const [logo, setLogo] = useState('')
  const [region, setRegion] = useState('')
  const [creationDate, setCreationDate] = useState('')
  const [tis, setTis] = useState('')
  const [description, setDescription] = useState('')
  const [achievements, setAchievements] = useState('')
  const [best_performance, setBestPerformance] = useState('')

  useEffect(() => {
    const getTeamById = async () => {
      let team
      if (teams.length > 0) {
        //Since filter returns an array we only need first indexed object hence 0
        team = await teams.filter((team) => team._id === match.params.id)[0]
        setName(team.name)
        setRegion(team.region)
        setCreationDate(team.creation_date)
        setLogo(team.logo)
        setDescription(team.description)
        setTis(team.tis_won)
        setBestPerformance(team.best_performance)
        setAchievements(team.achievements)
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
                <LinkContainer to='/teams'>
                  <span className='team-details-back-arrow'>
                    <i class='fas fa-arrow-circle-left'></i>
                  </span>
                </LinkContainer>
                {'  '}
                {name}
              </h3>
            </Col>
          </Row>
          <Row>
            <Col className='offset-lg-2' lg={3} md={6} sm={12}>
              <div class='team-logo-container'>
                <img
                  src={`http://localhost:7000/${logo}`}
                  alt='team-logo'
                  className='team-detail-logo'
                />
              </div>
              <div className='details-achievements'>
                <h5 className='achievements-title'>Achievements</h5>
                <div className='achievements-desc'>{achievements}</div>
              </div>
            </Col>
            <Col lg={5} md={6} sm={12}>
              <div className='details-side-sect'>
                <h5 className='details-achievements-desc-title'>
                  Team Information:
                </h5>
                <table>
                  <tr>
                    <td className='detail-label'>Region:</td>
                    <td>{region}</td>
                  </tr>
                  <tr>
                    <td className='detail-label'>Founded:</td>
                    <td>{creationDate}</td>
                  </tr>
                  <tr>
                    <td className='detail-label'>TIs won:</td>
                    <td>{tis}</td>
                  </tr>
                  <tr>
                    <td className='detail-label'>Best Performance:</td>
                    <td>{best_performance}</td>
                  </tr>
                </table>
                <hr />
                <h5 className='details-achievements-desc-title'>
                  Team Description:
                </h5>
                <div className='details-description'>{description}</div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  )
}

export default TeamDetailScreen
