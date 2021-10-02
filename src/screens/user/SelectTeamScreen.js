import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import useLoginValidation from '../../hooks/userLoginValidatorHook'

import { Container, Row, Col, Form, Table, Button } from 'react-bootstrap'

import {
  getQualifiedPlayers,
  getQualifiedTeams,
} from '../../actions/tournament-action'

import Header from '../../components/Layout/User/Header'
import Footer from '../../components/Layout/User/Footer'
import Disclaimer from '../../components/Disclaimer'
import Popup from '../../components/Popup'
import Logo from '../../components/Logo'

import SelectTeamList from '../../components/SelectTeamList'
import TeamPreview from '../../components/TeamPreview'
import { createArcanaTeam, getMyTournaments } from '../../actions/user-action'

const CreateTournamentTeamScreen = ({ history }) => {
  useLoginValidation(history)

  const [role, setRole] = useState(['Hard Support', 'Soft Support'])

  const tournamentDetails = useSelector((state) => state.tournamentDetails)
  const {
    qualifiedPlayers,
    qualifiedTeams: { teams },
  } = tournamentDetails

  //  const teams = { qualifiedTeams }

  const userDetails = useSelector((state) => state.userDetails)
  const { userInfo } = userDetails

  const dispatch = useDispatch()
  const { tid } = useParams()

  const [selectedPlayers, setSelectedPlayers] = useState([])
  const [preview, setPreview] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showFilter, setShowFilter] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(false)

  const [name, setName] = useState('')
  const [teamFilter, setTeamFilter] = useState('Filter by Team')
  //Section is to track the different sections of creating a team
  const [liveSection, setLiveSection] = useState('disclaimer')

  const [teamPrediction, setTeamPrediction] = useState('')

  useEffect(() => {
    dispatch(getQualifiedPlayers(tid))
    dispatch(getQualifiedTeams(tid))
  }, [tid, dispatch])

  const handleLiveSection = (nextSection) => {
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
      const newPlayerTeam = newPlayerDetails.team
      //Getting the already selected player details
      let selectedPlayerDetails = qualifiedPlayers.filter((p) =>
        selectedPlayers.includes(p._id)
      )
      console.log(selectedPlayerDetails)
      //Getting the players from the same team
      let sameTeamPlayers = selectedPlayerDetails.filter(
        (p) => p.team === newPlayerTeam
      )

      //if we already have 3 players from the same team which the user is trying to add one more from show eror
      if (sameTeamPlayers.length === 3) {
        console.log(sameTeamPlayers)
        setError('You can only select maximum 3 players from one team.')
      } else {
        let updatedSelectedPlayers = [...selectedPlayers, newPlayer]

        setSelectedPlayers(updatedSelectedPlayers)
        //console.log(selectedPlayers)
      }

      //console.log(selectedPlayers)
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

  const submitArcanaTeam = (e) => {
    e.preventDefault()
    if (selectedPlayers.length < 12) {
      setError(
        'Please select 12 players for your team. You can click on the Preview button to see your selected players'
      )
    } else if (teamPrediction === '') {
      setError('Please select a team for Victory prediction')
    } else {
      setConfirmationModal(true)
    }
  }

  const clearFilter = () => {
    setTeamFilter('Filter by Team')
    setName('')
  }

  const handleArcanaTeamCreation = () => {
    const userId = userInfo._id
    //Fetched from above where it was extractred using useParams
    const tournamentId = tid
    setConfirmationModal(false)
    dispatch(
      createArcanaTeam(tournamentId, userId, teamPrediction, selectedPlayers)
    ).then(() => {
      setSuccess('Arcana Team created successfully')
    })
  }

  const handleTeamCreationSuccess = () => {
    setSelectedPlayers([])
    dispatch(getMyTournaments(userInfo._id))
    setTeamPrediction('')
    setLiveSection('disclaimer')
    setRole(['Hard Support', 'Soft Support'])
    setSuccess('')
    setError('')
    history.push(`/tournaments/${tid}`)
  }

  return (
    <div>
      <Header />
      <Container>
        {success !== '' ? (
          <Popup
            title='Team creation'
            body={success}
            onClose={handleTeamCreationSuccess}
            type='success'
          />
        ) : null}
        {error !== '' ? (
          <Popup
            title='Team creation'
            body={error}
            onClose={() => setError('')}
            type='success'
          />
        ) : null}
        {confirmationModal ? (
          <Popup
            title='Arcana Team Creation'
            body='Do you want to lock  your Arcana Team for this tournament? You cannot make any changes to your team after making this confirmation'
            type='confirm'
            onClose={() => setConfirmationModal(false)}
            onConfirm={handleArcanaTeamCreation}
          />
        ) : null}
        <Row>
          <Col sm={12}>
            {liveSection === 'disclaimer' ? (
              <Disclaimer setSection={handleLiveSection} />
            ) : null}
            {liveSection === 'Team-selection' ? (
              preview ? (
                <TeamPreview
                  team={selectedPlayers}
                  onClose={() => setPreview(false)}
                  remove={removeSelectedPlayers}
                />
              ) : (
                <>
                  {!showFilter ? (
                    <Button
                      className='arcana-btn my-2'
                      style={{ backgroundColor: 'black' }}
                      onClick={() => setShowFilter(true)}
                    >
                      Filters
                    </Button>
                  ) : (
                    <>
                      <Button
                        className='arcana-btn my-2'
                        style={{ backgroundColor: 'black' }}
                        onClick={() => setShowFilter(false)}
                      >
                        Hide Filters
                      </Button>
                      <Button
                        className='arcana-btn my-2'
                        style={{ backgroundColor: 'black', float: 'right' }}
                        onClick={clearFilter}
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
                          {teams.map((team) => {
                            return <option value={team._id}>{team.name}</option>
                          })}
                        </Form.Control>
                      </Form.Group>
                    </>
                  ) : null}
                  <p
                    className='pt-2 text-center mb-2'
                    style={{ color: 'white' }}
                  >
                    Select 3 - 5 players from the following roles:&nbsp;
                  </p>
                  <p
                    className='p-2 text-center m-0'
                    style={{
                      background: '#dcb570',
                      color: 'black',
                      fontWeight: '600',
                    }}
                  >
                    {role.map((r) => (
                      <span>{r}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    ))}
                  </p>

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
                    {role.includes('Hard Support', 'Soft Support') ? (
                      <>
                        <Button
                          className='arcana-btn'
                          style={{ backgroundColor: 'black' }}
                          onClick={() => setPreview(true)}
                        >
                          Preview
                        </Button>
                        <Button
                          variant='success'
                          onClick={() => setRole(['Offlane'])}
                          style={{ float: 'right' }}
                        >
                          Next
                        </Button>{' '}
                      </>
                    ) : role.includes('Offlane') ? (
                      <>
                        <Button
                          className='arcana-btn'
                          style={{ backgroundColor: 'black' }}
                          onClick={() =>
                            setRole(['Hard Support', 'Soft Support'])
                          }
                        >
                          Back
                        </Button>{' '}
                        <Button
                          className='arcana-btn'
                          style={{ backgroundColor: 'black' }}
                          onClick={() => setPreview(true)}
                        >
                          Preview
                        </Button>
                        <Button
                          variant='success'
                          onClick={() => setRole(['Mid', 'Carry'])}
                          style={{ float: 'right' }}
                        >
                          Next
                        </Button>{' '}
                      </>
                    ) : role.includes('Carry', 'Mid') ? (
                      <>
                        <Button
                          className='arcana-btn'
                          style={{ backgroundColor: 'black' }}
                          onClick={() => setRole(['Offlane'])}
                        >
                          Back
                        </Button>{' '}
                        <Button
                          className='arcana-btn'
                          style={{ backgroundColor: 'black' }}
                          onClick={() => setPreview(true)}
                        >
                          Preview
                        </Button>
                        <Button
                          variant='success'
                          onClick={() => setLiveSection('Team-prediction')}
                          style={{ float: 'right' }}
                        >
                          Next
                        </Button>
                      </>
                    ) : null}
                  </div>
                </>
              )
            ) : null}
            {liveSection === 'Team-prediction' ? (
              <>
                <h6
                  className='text-center p-2'
                  style={{
                    background: '#51B155',
                    color: 'white',
                    margin: '0',
                  }}
                >
                  Predict a Team for Tournament Victory
                </h6>
                <p
                  className='p-2'
                  style={{
                    background: '#FF9C09',
                    color: 'white',
                    margin: '0',
                  }}
                >
                  Note: Remember, correct team prediction gives the maximum
                  points.
                </p>
                <div style={{ maxHeight: '64vh', overflowY: 'auto' }}>
                  <Table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Region</th>
                        <th>Logo</th>
                        <th>Predict</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teams.map((team) => (
                        <tr key={team._id}>
                          <td>{team.name}</td>
                          <td>{team.region}</td>
                          <td>
                            <Logo path={team.logo} />
                          </td>
                          <td>
                            {teamPrediction !== team._id ? (
                              <Button
                                variant='primary'
                                onClick={() => setTeamPrediction(team._id)}
                                style={{ width: '40px' }}
                              >
                                <i class='fas fa-plus-circle'></i>
                              </Button>
                            ) : (
                              <Button
                                variant='danger'
                                onClick={() => setTeamPrediction('')}
                                style={{ width: '40px' }}
                              >
                                <i class='fas fa-times'></i>
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
                <div className='my-4'>
                  <Button
                    variant='danger'
                    onClick={() => setLiveSection('Team-selection')}
                  >
                    Back
                  </Button>
                  <Button
                    variant='success'
                    style={{ float: 'right' }}
                    onClick={submitArcanaTeam}
                  >
                    Create
                  </Button>
                </div>
              </>
            ) : null}
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  )
}

export default CreateTournamentTeamScreen
