import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Footer from '../../components/Layout/User/Footer'
import Header from '../../components/Layout/User/Header'

import { useDispatch, useSelector } from 'react-redux'

import TeamCard from '../../components/Cards/Team/TeamCard'

import { filterTeams, getTeams, sortTeams } from '../../actions/team-actions'
import FilterName from '../../components/Filters/FilterName'
import FilterRegion from '../../components/Filters/FilterRegion'
import Sorter from '../../components/Filters/Sorter'
import { RESET_TEAM_FILTERS } from '../../constants/team-constants'

const TeamListScreen = () => {
  const teamDetails = useSelector((state) => state.teamDetails)
  const { teams, filteredTeams } = teamDetails

  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [region, setRegion] = useState('Filter by Region')
  const [sort, setSort] = useState('Default')
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
    //e.preventDefault()
    setSort('Default')
    setRegion('Filter by Region')
    console.log(region)
    setName('')
    dispatch({ type: RESET_TEAM_FILTERS })
  }
  useEffect(() => {
    if (teams.length === 0) {
      dispatch(getTeams())
    }
  }, [])

  return (
    <>
      <Header />
      <div className='user-screen-container'>
        <Container>
          <Row className='filter-container'>
            <Col md={2}>
              <br />
              <h5>
                Arcana Teams:
                {name !== '' || region !== 'Filter by Region'
                  ? ' ' + filteredTeams.length
                  : ' ' + teams.length}{' '}
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
                className='my-4 clear-btn'
                onClick={handleClearFilter}
              >
                Clear
              </Button>
            </Col>
          </Row>
          <Row>
            {name !== '' || region !== 'Filter by Region' || sort !== 'Default'
              ? filteredTeams.map((team) => (
                  <Col lg={3} md={6} sm={12}>
                    <TeamCard
                      key={team._id}
                      logo={team.logo}
                      id={team._id}
                      name={team.name}
                      region={team.region}
                      bestPerformance={team.best_performance}
                    />
                  </Col>
                ))
              : teams.map((team) => (
                  <Col lg={3} md={6} sm={12}>
                    <TeamCard
                      key={team._id}
                      logo={team.logo}
                      id={team._id}
                      name={team.name}
                      region={team.region}
                      bestPerformance={team.best_performance}
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

export default TeamListScreen
