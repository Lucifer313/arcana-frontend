import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Row, Col, Button, Form, Table } from 'react-bootstrap'
import Logo from '../../../components/Logo'
import { useParams } from 'react-router-dom'
import Message from '../../../components/Message'
import Loader from '../../../components/Loader'
import {
  eliminateTeam,
  undoTeamElimination,
} from '../../../actions/tournament-action'

const EliminateTeamScreen = () => {
  const dispatch = useDispatch()
  const { tid } = useParams()
  console.log(tid)
  const [eliminationTeam, setEliminationTeam] = useState('')

  const tournamentDetails = useSelector((state) => state.tournamentDetails)
  const { qualifiedTeams, loading, error } = tournamentDetails

  const handleUndoTeamElimination = (id) => {
    dispatch(undoTeamElimination(tid, id))
  }

  const handleTeamElimination = () => {
    dispatch(eliminateTeam(tid, eliminationTeam))
  }

  return (
    <div>
      <Container>
        <Row>
          <Col lg={6}>
            <Form className='my-3'>
              <h3>Eliminate Team</h3>
              {error ? <Message variant='danger'>{error}</Message> : null}
              <Form.Group controlId='eliminateTeam' className='my-3'>
                <Form.Label>Select team to be Eliminated</Form.Label>
                <Form.Control
                  as='select'
                  value={eliminationTeam}
                  onChange={(e) => setEliminationTeam(e.target.value)}
                >
                  <option>Select Team</option>
                  {qualifiedTeams.teams
                    .filter((team) => {
                      return !qualifiedTeams.eliminatedTeams.includes(team._id)
                    })
                    .map((team) => {
                      return <option value={team._id}>{team.name}</option>
                    })}
                </Form.Control>
              </Form.Group>
              <Form.Group>{loading ? <Loader /> : null}</Form.Group>
              <Button variant='danger' onClick={handleTeamElimination}>
                Eliminate
              </Button>
            </Form>
          </Col>
          <Col lg={6}>
            <h3 className='my-3'>Eliminated Teams</h3>
            <Table>
              <thead>
                <tr>
                  <th>Team Name</th>
                  <th>Logo</th>
                  <th>Undo</th>
                </tr>
              </thead>
              <tbody>
                {qualifiedTeams.teams
                  .filter((team) => {
                    return qualifiedTeams.eliminatedTeams.includes(team._id)
                  })
                  .map((team) => {
                    return (
                      <tr>
                        <td>{team.name}</td>
                        <td>
                          <Logo path={team.logo} />
                        </td>
                        <td>
                          <Button
                            variant='danger'
                            onClick={() => handleUndoTeamElimination(team._id)}
                            className='eliminate-team'
                          >
                            <i class='fas fa-times'></i>
                          </Button>
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default EliminateTeamScreen
