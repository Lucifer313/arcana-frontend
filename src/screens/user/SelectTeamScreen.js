import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'

import { Container, Row, Col, Form, Button } from 'react-bootstrap'

import {
  getQualifiedPlayers,
  getQualifiedTeams,
} from '../../actions/tournament-action'

import Header from '../../components/Layout/User/Header'
import Footer from '../../components/Layout/User/Footer'
import Disclaimer from '../../components/Disclaimer'
import Popup from '../../components/Popup'

import SelectTeamList from '../../components/SelectTeamList'
import TeamPreview from '../../components/TeamPreview'

const CreateTournamentTeamScreen = ({ match }) => {
  const [role, setRole] = useState(['Hard Support', 'Soft Support'])

  const tournamentDetails = useSelector((state) => state.tournamentDetails)
  const { qualifiedPlayers, qualifiedTeams } = tournamentDetails

  const dispatch = useDispatch()
  const { tid } = useParams()

  const [selectedPlayers, setSelectedPlayers] = useState([])
  const [preview, setPreview] = useState(false)
  const [error, setError] = useState('')
  const [showFilter, setShowFilter] = useState(false)

  const [name, setName] = useState('')
  const [teamFilter, setTeamFilter] = useState('Filter by Team')
  //Section is to track the different sections of creating a team
  const [liveSection, setLiveSection] = useState('disclaimer')

  useEffect(() => {
    dispatch(getQualifiedPlayers(tid))
    dispatch(getQualifiedTeams(tid))
  }, [match.params.id])

  const handleLiveSection = (nextSection) => {
    //
    setLiveSection(nextSection)
  }

  //Adding new players to the selected team list
  const addSelectedPlayers = (newPlayer) => {
    if (selectedPlayers.length < 12) {
      //Getting all the details of the selected new player
      const newPlayerDetails = qualifiedPlayers.filter(
        (p) => p._id === newPlayer
      )[0]

      //Getting the team ID of the selected new player
      const newPlayerTeam = newPlayerDetails.team._id

      //Getting the already selected player details
      let selectedPlayerDetails = qualifiedPlayers.filter((p) =>
        selectedPlayers.includes(p._id)
      )

      //Getting the players from the same team
      let sameTeamPlayers = selectedPlayerDetails.filter(
        (p) => p.team._id === newPlayerTeam
      )

      //if we already have 3 players from the same team which the user is trying to add one more from show eror
      if (sameTeamPlayers.length === 3) {
        setError('You can only select maximum 3 players from one team.')
      } else {
        let updatedSelectedPlayers = [...selectedPlayers, newPlayer]

        setSelectedPlayers(updatedSelectedPlayers)
        //console.log(selectedPlayers)
      }
    } else {
      setError('You are only allowed to select 12 players')
    }
  }

  //Removing players from the selected team list
  const removeSelectedPlayers = (player) => {
    let updatedSelectedPlayers = selectedPlayers.filter((p) => p !== player)
    setSelectedPlayers(updatedSelectedPlayers)
    console.log(selectedPlayers)
  }

  const clearFilter = () => {
    setTeamFilter('Filter by Team')
    setName('')
  }
  return (
    <div>
      <Header />
      <Container>
        <Row>
          <Col sm={12}>
            {liveSection === 'disclaimer' ? (
              <Disclaimer setSection={handleLiveSection} />
            ) : null}
            {liveSection === 'Core-Selection' ? (
              preview ? (
                <TeamPreview
                  team={selectedPlayers}
                  onClose={() => setPreview(false)}
                  remove={removeSelectedPlayers}
                />
              ) : (
                <>
                  <h5 className='py-2 text-center'>
                    Select 4 - 5 players from each role group
                  </h5>
                  {!showFilter ? (
                    <Button
                      variant='primary'
                      onClick={() => setShowFilter(true)}
                    >
                      Show Filters
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant='danger'
                        onClick={() => setShowFilter(false)}
                      >
                        Hide Filters
                      </Button>
                      <Button
                        variant='warning'
                        onClick={clearFilter}
                        className='my-2'
                        style={{ float: 'right' }}
                      >
                        Clear
                      </Button>
                    </>
                  )}
                  {showFilter ? (
                    <>
                      <Form.Group controlId='nameFilter' className='my-3'>
                        <Form.Control
                          type='text'
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder='Search by name'
                          style={{ padding: '.5rem !important' }}
                        />
                      </Form.Group>
                      <Form.Group controlId='teamFilter' className='mt-3'>
                        <Form.Control
                          as='select'
                          value={teamFilter}
                          onChange={(e) => setTeamFilter(e.target.value)}
                        >
                          <option>Filter by Team</option>
                          {qualifiedTeams.map((team) => {
                            return <option value={team._id}>{team.name}</option>
                          })}
                        </Form.Control>
                      </Form.Group>
                    </>
                  ) : null}
                  <SelectTeamList
                    players={qualifiedPlayers}
                    role={role}
                    nameFilter={name}
                    teamFilter={teamFilter}
                    selectedPlayers={selectedPlayers}
                    addPlayers={addSelectedPlayers}
                    removePlayers={removeSelectedPlayers}
                    previewStatus={preview}
                  />
                  <div className='my-2'>
                    {role.includes('Hard Support', 'Support') ? (
                      <>
                        <Button
                          variant='warning'
                          onClick={() => setPreview(true)}
                        >
                          Preview
                        </Button>
                        <Button
                          variant='primary'
                          onClick={() => setRole(['Offlane'])}
                          style={{ float: 'right' }}
                        >
                          Next
                        </Button>{' '}
                      </>
                    ) : role.includes('Offlane') ? (
                      <>
                        <Button
                          variant='danger'
                          onClick={() => setRole(['Hard Support', 'Support'])}
                        >
                          Back
                        </Button>{' '}
                        <Button
                          variant='warning'
                          onClick={() => setPreview(true)}
                        >
                          Preview
                        </Button>
                        <Button
                          variant='primary'
                          onClick={() => setRole(['Mid', 'Carry'])}
                          style={{ float: 'right' }}
                        >
                          Next
                        </Button>{' '}
                      </>
                    ) : role.includes('Carry', 'Mid') ? (
                      <>
                        <Button
                          variant='danger'
                          onClick={() => setRole(['Offlane'])}
                        >
                          Back
                        </Button>{' '}
                        <Button
                          variant='warning'
                          onClick={() => setPreview(true)}
                        >
                          Preview
                        </Button>
                      </>
                    ) : null}
                  </div>
                  {error !== '' ? (
                    <Popup
                      title='Team creation'
                      body={error}
                      onClose={() => setError('')}
                      type='success'
                    />
                  ) : null}
                </>
              )
            ) : null}
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  )
}

export default CreateTournamentTeamScreen
