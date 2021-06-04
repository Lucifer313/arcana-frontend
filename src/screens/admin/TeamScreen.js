import { useEffect, useState } from 'react'
import { Container, Row, Col, Button, Table, Form } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Header from '../../components/Header'
import Popup from '../../components/Popup'

import {
  deleteTeam,
  getTeams,
  resetTeamDeletion,
} from '../../actions/team-actions'
import Loader from '../../components/Loader'

const HomeScreen = ({ history }) => {
  const userDetails = useSelector((state) => state.userDetails)
  const { userInfo } = userDetails

  const teamDetails = useSelector((state) => state.teamDetails)
  const { loading, loaded, teams, error, deleted } = teamDetails

  const dispatch = useDispatch()

  let counter = 0

  //Check if user is logged in or redirect
  useEffect(() => {
    if (!userInfo) {
      history.push('/admin/login')
    } else {
      dispatch(getTeams())
    }
  }, [userInfo, history, dispatch])

  //To execute on every page load
  useEffect(() => {
    dispatch(getTeams())
    counter = 0
  }, [])

  /*const handleDelete = (id) => {
    dispatch(deleteTeam(id))
  }*/

  const handleRegionFilter = (e) => {
    console.log(e.target.value)
  }

  return (
    <>
      <Header></Header>
      <Container>
        <Row className='mt-5'>
          <Col md={3}>
            <LinkContainer to='/admin/teams/create'>
              <Button variant='primary' className='my-4'>
                Create Team
              </Button>
            </LinkContainer>
          </Col>
          <Col md={3}>
            <Form.Group controlId='regionFilter' className='mt-3'>
              <Form.Label>Filter by Region</Form.Label>
              <Form.Control as='select' onChange={(e) => handleRegionFilter(e)}>
                <option>EU</option>
                <option>China</option>
                <option>SEA</option>
                <option>NA</option>
                <option>SA</option>
              </Form.Control>
            </Form.Group>
          </Col>
          {deleted ? (
            <Popup
              title='Team Deletion'
              body='Team deleted successfully'
              type='success'
              onClose={() => dispatch(resetTeamDeletion())}
            />
          ) : null}
        </Row>
        <Row>
          <Col>
            {loading ? (
              <Loader />
            ) : (
              <Table striped hover>
                <thead>
                  <tr>
                    <th>Sr.</th>
                    <th>Team Name</th>
                    <th>Region</th>
                    <th>View</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((t) => (
                    <tr key={t._id}>
                      <td>{++counter}</td>
                      <td>{t.name}</td>
                      <td>{t.region}</td>
                      <td>
                        <Button variant='primary'>
                          <i class='fas fa-eye'></i>
                        </Button>
                      </td>
                      <td>
                        <LinkContainer to={'/admin/teams/edit/' + t._id}>
                          <Button variant='warning'>
                            <i class='fas fa-edit'></i>
                          </Button>
                        </LinkContainer>
                      </td>
                      <td>
                        <Button
                          variant='danger'
                          onClick={() => dispatch(deleteTeam(t._id))}
                        >
                          <i class='fas fa-trash-alt'></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default HomeScreen
