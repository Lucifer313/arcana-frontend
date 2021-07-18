import React, { useState, useEffect } from 'react'
import Footer from '../../../components/Layout/Admin/Footer'
import Header from '../../../components/Layout/Admin/Header'
import { Container, Row, Col, Nav, Tabs, Tab } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { getQualifiedTeams } from '../../../actions/tournament-action'
import { useParams } from 'react-router'
import AddMatchPointScreen from './AddMatchPointScreen'

const AdminTournamentDetailsScreen = () => {
  const { tid } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getQualifiedTeams(tid))
  }, [])
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
                  <Nav.Link eventKey='second'>Declare Winner</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='second'>Edit Tourament</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='second'>Back</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey='first'>
                  <AddMatchPointScreen />
                </Tab.Pane>
                <Tab.Pane eventKey='second'>
                  <p>WP</p>
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
