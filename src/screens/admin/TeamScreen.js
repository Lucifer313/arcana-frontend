import { useEffect } from 'react'
import { Container, Row, Col, Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../components/Header'
import { deleteTeam, getTeams } from '../../actions/team-actions'
import Loader from '../../components/Loader'

const HomeScreen = ({ history }) => {
  const userDetails = useSelector((state) => state.userDetails)
  const { userInfo } = userDetails

  const teamDetails = useSelector((state) => state.teamDetails)
  const { get_loading, error, teams } = teamDetails

  const dispatch = useDispatch()

  let counter = 0

  useEffect(() => {
    if (!userInfo) {
      history.push('/admin/login')
    } else {
      dispatch(getTeams())
    }
  }, [userInfo, history, dispatch])

  useEffect(() => {
    dispatch(getTeams())
    console.log(teams)
    counter = 0
  }, [])

  const handleDelete = (id) => {
    dispatch(deleteTeam(id))
  }

  return (
    <>
      <Header></Header>
      <Container>
        <Row>
          <Col>
            <LinkContainer to='/admin/teams/create'>
              <Button variant='primary' className='my-4'>
                Create Team
              </Button>
            </LinkContainer>
            {get_loading ? null : (
              <Table>
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
                    <tr>
                      <td>{++counter}</td>
                      <td>{t.name}</td>
                      <td>{t.region}</td>
                      <td>
                        <Button variant='primary'>
                          <i class='fas fa-eye'></i>
                        </Button>
                      </td>
                      <td>
                        <Button variant='warning'>
                          <i class='fas fa-edit'></i>
                        </Button>
                      </td>
                      <td>
                        <Button
                          variant='danger'
                          onClick={() => handleDelete(t._id)}
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
