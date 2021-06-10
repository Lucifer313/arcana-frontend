import { useEffect, useState } from 'react'

import { Container, Row, Col, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import axios from '../../../axios-config'
import { useDispatch, useSelector } from 'react-redux'

import Header from '../../../components/Layout/Header'
import Popup from '../../../components/Popup'

import {
  deleteTeam,
  filterTeams,
  resetTeamDeletion,
  sortTeams,
} from '../../../actions/team-actions'

import Loader from '../../../components/Loader'
import Footer from '../../../components/Layout/Footer'
import FilterRegion from '../../../components/Filters/FilterRegion'
import FilterName from '../../../components/Filters/FilterName'

import useLoginValidation from '../../../hooks/loginValidatorHook'
import Sorter from '../../../components/Filters/Sorter'
import {
  deletePlayer,
  filterPlayers,
  getPlayers,
  sortPlayers,
} from '../../../actions/player-action'
import PlayerList from '../../../components/PlayerList'
import { DELETE_TEAM_RESET } from '../../../constants/team-constants'
import { DELETE_PLAYER_RESET } from '../../../constants/player-constants'

const PlayerScreen = ({ history }) => {
  const teamDetails = useSelector((state) => state.teamDetails)
  const { teams, filteredTeams } = teamDetails

  const playerDetails = useSelector((state) => state.playerDetails)
  const { loading, players, deleted, filteredPlayers } = playerDetails

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
    dispatch(getPlayers())
  }, [])

  const handleDelete = () => {
    setDeletionId('')
    setConfirmationModal(false)
    dispatch(deletePlayer(deletionId))
  }

  const handleDeleteTeamModal = (id) => {
    setDeletionId(id)
    setConfirmationModal(true)
  }

  const handleRegionFilter = (e) => {
    let name = e.target.name
    console.log(e.target.name)
    setRegion(e.target.value)
    dispatch(filterPlayers(e.target.value, name))
  }

  const handleNameFilter = (e) => {
    console.log(e.target.name)
    setName(e.target.value)
    dispatch(filterPlayers(region, e.target.value))
  }

  const handleSorter = (e) => {
    setSort(e.target.value)
    dispatch(sortPlayers(e.target.value))
  }

  const handleClearFilter = (e) => {
    //e.preventDefault()
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
            <LinkContainer to='/admin/players/create'>
              <Button variant='primary' className='my-4'>
                Create Player
              </Button>
            </LinkContainer>
          </Col>
          <Col md={1}>
            <br />
            <p>Result: </p>
            <p>
              {name !== '' || region !== 'All'
                ? filteredPlayers.length
                : players.length}{' '}
              Records
            </p>
          </Col>
          <FilterRegion filterRegion={handleRegionFilter} value={region} />
          <FilterName
            change={handleNameFilter}
            value={name}
            label='Filter by Name'
            placeholder='Enter the Player name'
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
              title='Player Deletion'
              body='Are you sure you want to delete this player?'
              type='confirm'
              onClose={() => setConfirmationModal(false)}
              onConfirm={handleDelete}
            />
          ) : null}
          {deleted ? (
            <Popup
              title='Player Deletion'
              body='Player deleted successfully'
              type='success'
              onClose={() => dispatch({ type: DELETE_PLAYER_RESET })}
            />
          ) : null}
        </Row>
        <Row>
          <Col>
            {loading ? (
              <Loader />
            ) : name !== '' || region !== 'All' || sort !== 'Default' ? (
              <PlayerList
                players={filteredPlayers}
                deleteModal={(id) => handleDeleteTeamModal(id)}
              />
            ) : (
              <PlayerList
                players={players}
                deleteModal={handleDeleteTeamModal}
              />
            )}
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  )
}

export default PlayerScreen