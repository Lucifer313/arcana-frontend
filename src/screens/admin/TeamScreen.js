import { useEffect, useState } from 'react'
import { Container, Row, Col, Button, Table, Form } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Header from '../../components/Header'
import Popup from '../../components/Popup'

import {
  deleteTeam,
  filterTeamByRegion,
  getTeams,
  resetTeamDeletion,
} from '../../actions/team-actions'
import Loader from '../../components/Loader'
import Logo from '../../components/Logo'
import Footer from '../../components/Footer'
import FilterRegion from '../../components/Filters/FilterRegion'
import { TeamList } from '../../components/TeamList'

const HomeScreen = ({ history }) => {
  const userDetails = useSelector((state) => state.userDetails)
  const { userInfo } = userDetails

  const teamDetails = useSelector((state) => state.teamDetails)
  const { loading, loaded, teams, error, deleted, filteredTeams } = teamDetails

  const [confirmationModal, setConfirmationModal] = useState(false)
  const [deletionId, setDeletionId] = useState('')

  const [region, setRegion] = useState('All')

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

  const handleDelete = () => {
    setDeletionId('')
    setConfirmationModal(false)
    dispatch(deleteTeam(deletionId))
  }

  const handleDeleteTeamModal = (id) => {
    setDeletionId(id)
    setConfirmationModal(true)
  }

  const handleRegionFilter = (e) => {
    console.log(e.target.value)
    setRegion(e.target.value)
    dispatch(filterTeamByRegion(e.target.value))
  }

  return (
    <>
      <Header />
      <Container style={{ minHeight: '82vh' }}>
        <Row className='mt-5'>
          <Col md={3}>
            <LinkContainer to='/admin/teams/create'>
              <Button variant='primary' className='my-4'>
                Create Team
              </Button>
            </LinkContainer>
          </Col>
          <FilterRegion filterRegion={handleRegionFilter} value={region} />
          {confirmationModal ? (
            <Popup
              title='Team Deletion'
              body='Are you sure you want to delete this team?'
              type='confirm'
              onClose={() => setConfirmationModal(false)}
              onConfirm={handleDelete}
            />
          ) : null}
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
            ) : filteredTeams.length > 0 ? (
              <TeamList
                teams={filteredTeams}
                deleteModal={handleDeleteTeamModal}
              />
            ) : (
              <TeamList teams={teams} deleteModal={handleDeleteTeamModal} />
            )}
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  )
}

export default HomeScreen
