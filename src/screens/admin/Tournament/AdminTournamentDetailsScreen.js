import React, { useState, useEffect } from 'react'
import Footer from '../../../components/Layout/Admin/Footer'
import Header from '../../../components/Layout/Admin/Header'
import { Container, Row, Col, Nav, Tabs, Tab, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { getQualifiedTeams } from '../../../actions/tournament-action'
import { useParams } from 'react-router'
import AddMatchPointScreen from './AddMatchPointScreen'
import { LinkContainer } from 'react-router-bootstrap'

import './tournament.css'
import EliminateTeamScreen from './EliminateTeamScreen'
import DeclareWinnerScreen from './DeclareWinnerScreen'

const AdminTournamentDetailsScreen = ({ history }) => {
  const { tid } = useParams()
  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { userInfo } = userDetails

  useEffect(() => {
    dispatch(getQualifiedTeams(tid))
  }, [])

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
  }, [history, userInfo])

  return (
    <div>
      <Header />
      <Container fluid style={{ minHeight: '80vh' }}>
        <Tab.Container id='left-tabs-example' defaultActiveKey='first'>
          <Row>
            <Col sm={2}>
              <Nav variant='pills' className='flex-column'>
                <Nav.Item>
                  <Nav.Link eventKey='first'>Add Match Points</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='second'>Eliminate Teams</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='third'>Declare Winner</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='fourth'>Edit Tourament</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <LinkContainer to='/admin/tournaments'>
                    <Nav.Link>Back</Nav.Link>
                  </LinkContainer>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey='first'>
                  <AddMatchPointScreen />
                </Tab.Pane>
                <Tab.Pane eventKey='second'>
                  <EliminateTeamScreen />
                </Tab.Pane>
                <Tab.Pane eventKey='third'>
                  <DeclareWinnerScreen />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>{' '}
      </Container>
      <Footer />
    </div>
  )
}

export default AdminTournamentDetailsScreen
