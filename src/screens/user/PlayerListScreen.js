import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Footer from '../../components/Layout/User/Footer'
import Header from '../../components/Layout/User/Header'

import FilterName from '../../components/Filters/FilterName'
import FilterRegion from '../../components/Filters/FilterRegion'
import Sorter from '../../components/Filters/Sorter'
import './black-style.css'

import { useDispatch, useSelector } from 'react-redux'

import PlayerCard from '../../components/Cards/Player/PlayerCard'
import {
  filterPlayers,
  getPlayers,
  sortPlayers,
} from '../../actions/player-action'
import { RESET_PLAYER_FILTERS } from '../../constants/player-constants'

const PlayerListScreen = ({ history }) => {
  const playerDetails = useSelector((state) => state.playerDetails)
  const { players, filteredPlayers } = playerDetails

  const userDetails = useSelector((state) => state.userDetails)
  const { userInfo } = userDetails

  const [name, setName] = useState('')
  const [region, setRegion] = useState('Filter by Region')
  const [sort, setSort] = useState('Default')

  const [showFilter, setShowFilter] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    if (players.length === 0) {
      dispatch(getPlayers())
    }
  }, [])

  const handleRegionFilter = (e) => {
    setRegion(e.target.value)
    dispatch(filterPlayers(e.target.value, name))
  }

  const handleNameFilter = (e) => {
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
    setRegion('Filter by Region')
    console.log(region)
    setName('')
    dispatch({ type: RESET_PLAYER_FILTERS })
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
  }, [userInfo])

  return (
    <>
      <Header />
      <div className='user-screen-container'>
        <Container
          style={{
            backgroundImage: `url(${'/assets/images/user/aegis-ti10.jpg'})`,
          }}
        >
          <Row className='filter-container'>
            {!showFilter ? (
              <Col md={12}>
                <Button
                  onClick={() => setShowFilter(true)}
                  className='my-3'
                  style={{
                    backgroundColor: 'black',
                  }}
                >
                  SHOW FILTER
                </Button>
              </Col>
            ) : null}
            {showFilter ? (
              <>
                <Col md={2}>
                  <br />
                  <h5>
                    Arcana Players:
                    {name !== '' || region !== 'Filter by Region'
                      ? ' ' + filteredPlayers.length
                      : ' ' + players.length}{' '}
                  </h5>
                </Col>
                <FilterName
                  name={name}
                  placeholder='Search by Name'
                  label='Filter by Name'
                  change={handleNameFilter}
                  classes='filters'
                />
                <FilterRegion
                  filterRegion={handleRegionFilter}
                  value={region}
                  classes='filters'
                />
                <Sorter sortBy={handleSorter} value={sort} classes='filters' />
                <Col md={2}>
                  <Button
                    variant='primary'
                    className='my-4'
                    style={{ backgroundColor: 'black' }}
                    onClick={() => setShowFilter(false)}
                  >
                    HIDE FILTER
                  </Button>
                  <Button
                    variant='primary'
                    className='my-4'
                    style={{ backgroundColor: 'black', float: 'right' }}
                    onClick={handleClearFilter}
                  >
                    Clear
                  </Button>
                </Col>
              </>
            ) : null}
          </Row>
          <Row>
            {name !== '' || region !== 'Filter by Region' || sort !== 'Default'
              ? filteredPlayers.map((player) => (
                  <Col lg={3} md={6} sm={12}>
                    <PlayerCard
                      key={player._id}
                      profile_image={player.profile_image}
                      id={player._id}
                      name={player.alias}
                      role={player.role}
                      team={player.team.name}
                      team_logo={player.team.logo}
                    />
                  </Col>
                ))
              : players.map((player) => (
                  <Col lg={3} md={6} sm={12}>
                    <PlayerCard
                      key={player._id}
                      profile_image={player.profile_image}
                      id={player._id}
                      name={player.alias}
                      role={player.role}
                      team={player.team.name}
                      team_logo={player.team.logo}
                    />
                  </Col>
                ))}
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  )
}

export default PlayerListScreen
