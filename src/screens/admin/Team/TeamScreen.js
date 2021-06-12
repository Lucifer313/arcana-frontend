import { useEffect, useState } from 'react'

import { Container, Row, Col, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import axios from '../../../axios-config'
import { useDispatch, useSelector } from 'react-redux'

import Header from '../../../components/Layout/Admin/Header'
import Footer from '../../../components/Layout/Admin/Footer'

import Popup from '../../../components/Popup'

import {
  deleteTeam,
  filterTeams,
  getTeams,
  resetTeamDeletion,
  sortTeams,
} from '../../../actions/team-actions'

import Loader from '../../../components/Loader'

import FilterRegion from '../../../components/Filters/FilterRegion'
import TeamList from '../../../components/TeamList'
import FilterName from '../../../components/Filters/FilterName'

import useLoginValidation from '../../../hooks/loginValidatorHook'
import Sorter from '../../../components/Filters/Sorter'

const TeamScreen = ({ history }) => {
  const teamDetails = useSelector((state) => state.teamDetails)
  const { loading, teams, deleted, filteredTeams } = teamDetails

  const [confirmationModal, setConfirmationModal] = useState(false)
  const [deletionId, setDeletionId] = useState('')

  const [region, setRegion] = useState('All')
  const [name, setName] = useState('')
  const [sort, setSort] = useState('Default')

  const dispatch = useDispatch()

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
    setRegion(e.target.value)
    dispatch(filterTeams(e.target.value, name))
  }

  const handleNameFilter = (e) => {
    setName(e.target.value)
    dispatch(filterTeams(region, e.target.value))
  }

  const handleSorter = (e) => {
    setSort(e.target.value)
    dispatch(sortTeams(e.target.value))
  }

  const handleClearFilter = (e) => {
    setSort('Default')
    setRegion('All')
    setName('')
    console.log(sort)
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
          <Col md={1}>
            <br />
            <p>Result: </p>
            <p>
              {name !== '' || region !== 'All'
                ? filteredTeams.length
                : teams.length}{' '}
              Records
            </p>
          </Col>
          <FilterRegion filterRegion={handleRegionFilter} value={region} />
          <FilterName
            change={handleNameFilter}
            value={name}
            label='Filter by Name'
            placeholder='Enter the Team name'
          />
          <Sorter sortBy={handleSorter} value={sort} />
          <Col md={2}>
            <Button
              variant='primary'
              className='my-4'
              onClick={handleClearFilter}
            >
              Clear
            </Button>
          </Col>
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
            ) : name !== '' || region !== 'All' || sort !== 'Default' ? (
              <TeamList
                teams={filteredTeams}
                deleteModal={(id) => handleDeleteTeamModal(id)}
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

export default TeamScreen
