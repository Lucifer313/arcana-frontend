import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import Header from '../../../components/Layout/Admin/Header'
import Message from '../../../components/Message'
import Loader from '../../../components/Loader'
import Popup from '../../../components/Popup'

import Footer from '../../../components/Layout/Admin/Footer'
import useLoginValidation from '../../../hooks/loginValidatorHook'
import { createTournament } from '../../../actions/tournament-action'
import { CREATE_TOURNAMENT_RESET } from '../../../constants/tournament-constants'

import Select from 'react-select'
import { getTeams } from '../../../actions/team-actions'

const CreateTournamentScreen = ({ history }) => {
  //State variables
  const [name, setName] = useState('')
  const [tier, setTier] = useState('Premium')
  const [number_of_teams, setNumberOfTeams] = useState(0)
  const [prize_pool, setPrizePool] = useState('')
  const [begin_date, setBeginDate] = useState('')
  const [end_date, setEndDate] = useState('')
  const [qualifiedTeams, setQualifiedTeams] = useState([])
  const [number_of_days, setNumberOfDays] = useState('0')
  const [errorMessage, setErrorMessage] = useState('')

  //Extracting TeamDetails slice from the store
  const teamDetails = useSelector((state) => state.teamDetails)
  const { teams } = teamDetails

  let options = teams.map((team) => {
    return { value: team._id, label: team.name }
  })

  //const [options, setOptions] = useState(newOptions)

  const tournamentDetails = useSelector((state) => state.tournamentDetails)
  const { creating, created, error } = tournamentDetails

  const dispatch = useDispatch()

  //Redirection logic if not logged in
  useLoginValidation(history)

  //To run everytime the SPA is rendered
  useEffect(() => {
    setErrorMessage('')
    resetForm()
  }, [])

  //Creating Team function
  const handleSubmit = async (e) => {
    if (
      name === '' ||
      begin_date === '' ||
      end_date === '' ||
      prize_pool === ''
    ) {
      setErrorMessage('Plese enter all the details properly')
    } else if (name.length < 2) {
      setErrorMessage('Name of the team should be more than 2 characters')
    } else if (number_of_days <= 0) {
      setErrorMessage('Number of Days should be more than 0')
    } else if (number_of_teams <= 0) {
      setErrorMessage('Number of Teams should be more than 0')
    } else if (qualifiedTeams.length === 0) {
      setErrorMessage('Number of Qualified Teams should be more than 0')
    } else {
      //Getting the values of each selected team which holds their id
      let qTeams = qualifiedTeams.map((team) => {
        return team.value
      })

      dispatch(
        createTournament(
          name,
          tier,
          number_of_teams,
          prize_pool,
          begin_date,
          end_date,
          number_of_days,
          qTeams
        )
      )
    }
  }

  //Function to close the success popup
  const handleModalClose = () => {
    resetForm()
    dispatch({ type: CREATE_TOURNAMENT_RESET })
  }

  //Function to reset the form
  const resetForm = () => {
    setName('')
    setTier('Premium')
    setBeginDate('')
    setEndDate(0)
    setNumberOfDays('0')
    setNumberOfTeams('0')
    setErrorMessage('')
    setPrizePool('')
    setQualifiedTeams([])
  }

  return (
    <>
      <Header />
      <Container style={{ minHeight: '82vh' }} className='mb-5'>
        <Row>
          <h3 className='mt-5'>Create New Tournament</h3>
          <Col md='6'>
            <Form className='mt-3 mb-5'>
              {errorMessage ? (
                <Message variant='danger'>{errorMessage}</Message>
              ) : error ? (
                <Message variant='danger'>{error}</Message>
              ) : null}
              {created ? (
                <Popup
                  title='Tournament Creation'
                  body='Tournament created successfully'
                  type='success'
                  onClose={handleModalClose}
                />
              ) : null}

              <Form.Group
                controlId='createTournament.teamName'
                className='my-3'
              >
                <Form.Label>Tournament Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter the name of the tournament'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId='createTournament.tier' className='my-3'>
                <Form.Label>Tournament Tier</Form.Label>
                <Form.Control
                  as='select'
                  value={tier}
                  onChange={(e) => setTier(e.target.value)}
                >
                  <option>Premium</option>
                  <option>Major</option>
                  <option>Minor</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId='createTournament.nteams' className='my-3'>
                <Form.Label>Number of Teams</Form.Label>
                <Form.Control
                  type='number'
                  value={number_of_teams}
                  onChange={(e) => setNumberOfTeams(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                controlId='createTournament.prizePool'
                className='my-3'
              >
                <Form.Label>Prize Pool</Form.Label>
                <Form.Control
                  type='text'
                  value={prize_pool}
                  onChange={(e) => setPrizePool(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                controlId='createTournament.begin_date'
                className='my-3'
              >
                <Form.Label>Begin Date</Form.Label>
                <Form.Control
                  type='date'
                  value={begin_date}
                  onChange={(e) => setBeginDate(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Col>
          <Col md='6'>
            <Form className='mt-3'>
              <Form.Group
                controlId='createTournament.end_date'
                className='my-3'
              >
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type='date'
                  value={end_date}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId='createTournament.ndays' className='my-3'>
                <Form.Label>Number of Days</Form.Label>
                <Form.Control
                  type='number'
                  value={number_of_days}
                  onChange={(e) => setNumberOfDays(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                controlId='createTournament.qualifiedTeams'
                className='my-3'
              >
                <Form.Label>Qualified Teams</Form.Label>
                <Select
                  isMulti
                  value={qualifiedTeams}
                  placeholder='Select qualified teams'
                  options={options}
                  onChange={setQualifiedTeams}
                  isSearchable
                />
              </Form.Group>
              {creating ? <Loader className='my-3' /> : null}
              <Form.Group>
                <Button variant='primary' onClick={handleSubmit}>
                  Create
                </Button>
                &nbsp; &nbsp; &nbsp;
                <LinkContainer to='/admin/tournaments'>
                  <Button variant='danger'>Back</Button>
                </LinkContainer>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  )
}

export default CreateTournamentScreen
