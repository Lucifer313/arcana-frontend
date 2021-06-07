import { useEffect, useState } from 'react'

import { Container, Row, Col, Button, Table, Form } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import axios from '../../axios-config'
import { useDispatch, useSelector } from 'react-redux'

import Header from '../../components/Header'
import Popup from '../../components/Popup'

import {
  deleteTeam,
  filterTeams,
  getTeams,
  resetTeamDeletion,
} from '../../actions/team-actions'

import Loader from '../../components/Loader'
import Footer from '../../components/Footer'
import FilterRegion from '../../components/Filters/FilterRegion'
import { TeamList } from '../../components/TeamList'
import FilterName from '../../components/Filters/FilterName'

import useLoginValidation from '../../hooks/loginValidatorHook'

const HomeScreen = ({ history }) => {
  const teamDetails = useSelector((state) => state.teamDetails)
  const { loading, loaded, teams, error, deleted, filteredTeams } = teamDetails

  const [confirmationModal, setConfirmationModal] = useState(false)
  const [deletionId, setDeletionId] = useState('')

  const [region, setRegion] = useState('All')
  const [name, setName] = useState('')

  const dispatch = useDispatch()

  let counter = 0

  //Check if user is logged in or redirect
  useLoginValidation(history)

  //To execute on every page load
  useEffect(() => {
    dispatch(getTeams())

    const getMatchById = async () => {
      let matchDetails = await axios.get(
        'https://api.opendota.com/api/matches/6029614145'
      )
      console.log(matchDetails)
    }
    getMatchById()
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
    dispatch(filterTeams(e.target.value, name))
  }

  const handleNameFilter = (e) => {
    console.log(e.target.value)
    setName(e.target.value)
    dispatch(filterTeams(region, e.target.value))
  }

  return (
    <>
      <Header />
      <Container style={{ minHeight: '82vh' }}>
        <Row className='mt-5'>
          <Col md={2}>
            <LinkContainer to='/admin/teams/create'>
              <Button variant='primary' className='my-4'>
                Create Team
              </Button>
            </LinkContainer>
          </Col>
          <FilterRegion filterRegion={handleRegionFilter} value={region} />
          <FilterName change={handleNameFilter} value={name} />
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
            ) : name !== '' || region !== 'All' ? (
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
