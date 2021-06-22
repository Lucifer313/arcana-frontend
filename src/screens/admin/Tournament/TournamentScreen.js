import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Table, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import Header from '../../../components/Layout/Admin/Header'
import Footer from '../../../components/Layout/Admin/Footer'
import { getTournaments } from '../../../actions/tournament-action'

const TournamentScreen = () => {
  const tournamentDetails = useSelector((state) => state.tournamentDetails)
  const { tournaments } = tournamentDetails

  const dispatch = useDispatch()

  useEffect(() => {
    if (tournaments.length === 0) {
      dispatch(getTournaments())
    }
  }, [tournaments, dispatch])

  return (
    <>
      <Header />
      <Container style={{ minHeight: '82vh' }} className='my-5'>
        <Row>
          <Col md={3}>
            <LinkContainer to='/admin/tournaments/create'>
              <Button variant='primary' className='my-4'>
                Create Tournament
              </Button>
            </LinkContainer>
          </Col>
        </Row>
        <Row>
          <Table striped hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Tier</th>
                <th>Total Teams</th>
                <th>Days</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {tournaments.map((tournament) => (
                <tr>
                  <td>{tournament.name}</td>
                  <td>{tournament.tier}</td>
                  <td>{tournament.number_of_teams}</td>
                  <td>{tournament.number_of_days}</td>
                  <td>
                    <LinkContainer to={'/admin/players/edit/' + tournament._id}>
                      <Button variant='warning'>
                        <i class='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                  </td>
                  <td>
                    <Button variant='danger'>
                      <i class='fas fa-trash-alt'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
      </Container>
      <Footer />
    </>
  )
}

export default TournamentScreen
