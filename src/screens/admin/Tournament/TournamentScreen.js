import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Table, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import Header from '../../../components/Layout/Admin/Header'
import Footer from '../../../components/Layout/Admin/Footer'
import Popup from '../../../components/Popup'

import {
  deleteTournament,
  getTournaments,
} from '../../../actions/tournament-action'
import { DELETE_TOURNAMENT_RESET } from '../../../constants/tournament-constants'

const TournamentScreen = () => {
  const tournamentDetails = useSelector((state) => state.tournamentDetails)
  const { tournaments, deleted } = tournamentDetails

  const dispatch = useDispatch()

  const [confirmationModal, setConfirmationModal] = useState(false)
  const [deletionId, setDeletionId] = useState('')

  useEffect(() => {
    if (tournaments.length === 0) {
      dispatch(getTournaments())
    }
  }, [tournaments, dispatch])

  const deleteTournamentHandler = (id) => {
    setDeletionId(id)
    setConfirmationModal(true)
  }

  const handleDelete = () => {
    dispatch(deleteTournament(deletionId))
    setDeletionId('')
    setConfirmationModal(false)
  }

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
        {confirmationModal ? (
          <Popup
            title='Tournament Deletion'
            body='Are you sure you want to delete this tournament?'
            type='confirm'
            onClose={() => setConfirmationModal(false)}
            onConfirm={handleDelete}
          />
        ) : null}
        {deleted ? (
          <Popup
            title='Tournament Deletion'
            body='Tournament deleted successfully'
            type='success'
            onClose={() => dispatch({ type: DELETE_TOURNAMENT_RESET })}
          />
        ) : null}
        <Row>
          <Table striped hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Tier</th>
                <th>Total Teams</th>
                <th>View</th>
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
                  <td>
                    <LinkContainer to={'/admin/tournaments/' + tournament._id}>
                      <Button variant='primary'>
                        <i class='fas fa-eye'></i>
                      </Button>
                    </LinkContainer>
                  </td>
                  <td>
                    <LinkContainer to={'/admin/players/edit/' + tournament._id}>
                      <Button variant='warning'>
                        <i class='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                  </td>
                  <td>
                    <Button
                      variant='danger'
                      onClick={() => deleteTournamentHandler(tournament._id)}
                    >
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
