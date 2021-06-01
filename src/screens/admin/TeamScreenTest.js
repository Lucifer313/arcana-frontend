import { useEffect } from 'react'
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Accordion,
  Card,
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../components/Header'
import { deleteTeam, getTeams } from '../../actions/team-actions'

const TeamScreenTest = ({ history }) => {
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

  const FULL_WIDTH_STYLE = {
    width: '100% !important',
  }

  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col>
            <LinkContainer to='/admin/teams/create'>
              <Button variant='primary' className='my-4'>
                Create Team
              </Button>
            </LinkContainer>
            {get_loading ? null : (
              <>
                <Container>
                  <Row style={{ borderBottom: '1px solid black' }}>
                    <Col md={1}>
                      <strong>Sr.</strong>
                    </Col>
                    <Col md={6}>
                      <strong>Team Name</strong>
                    </Col>
                    <Col md={2}>
                      <strong>Region</strong>
                    </Col>
                  </Row>
                </Container>

                <Accordion defaultActiveKey='0'>
                  {teams.map((t) => (
                    <Card.Header
                      style={{
                        borderBottom: '1px solid rgb(155,155,155)',
                        padding: '0px !important',
                      }}
                      key={t._id}
                    >
                      <Accordion.Toggle
                        as={Col}
                        eventKey={++counter}
                        style={{
                          width: '100%',
                          textTransform: 'capitalize',
                          textAlign: 'left',
                          color: 'black',
                          textDecoration: 'none',
                          cursor: 'default',
                        }}
                      >
                        <Row>
                          <Col md={1}>{counter}</Col>
                          <Col md={6} className='text-left'>
                            {t.name}
                          </Col>
                          <Col md={2}>{t.region}</Col>
                          <Col md={1}>
                            <Button variant='primary'>
                              <i class='fas fa-eye'></i>
                            </Button>
                          </Col>
                          <Col md={1}>
                            <LinkContainer to={'/admin/teams/edit/' + t._id}>
                              <Button variant='warning'>
                                <i class='fas fa-edit'></i>
                              </Button>
                            </LinkContainer>
                          </Col>
                          <Col md={1}>
                            <Button
                              variant='danger'
                              onClick={() => handleDelete(t._id)}
                            >
                              <i class='fas fa-trash-alt'></i>
                            </Button>
                          </Col>
                        </Row>
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey={counter}>
                        <Card.Body style={{ backgroundColor: 'white' }}>
                          <h6>Name: {t.name}</h6>
                          <h6>Region: {t.region}</h6>
                          <h6>TIs Won: {t.tis_won}</h6>
                          <h6>Founded at: {t.creation_date}</h6>
                          <h6>Description: {t.description}</h6>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card.Header>
                  ))}
                </Accordion>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default TeamScreenTest
