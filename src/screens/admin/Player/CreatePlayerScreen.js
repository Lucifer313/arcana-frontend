import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { useSelector, useDispatch } from 'react-redux'

import Footer from '../../../components/Layout/Admin/Footer'
import Header from '../../../components/Layout/Admin/Header'
import Loader from '../../../components/Loader'
import Message from '../../../components/Message'
import Popup from '../../../components/Popup'

import useLoginValidation from '../../../hooks/loginValidatorHook'
import { CREATE_PLAYER_RESET } from '../../../constants/player-constants'
import { createPlayer } from '../../../actions/player-action'
import ImagePreview from '../../../components/ImagePreview'

const CreatePlayerScreen = ({ history }) => {
  const [name, setName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [alias, setAlias] = useState('')
  const [role, setRole] = useState('Carry')
  const [steamId, setSteamId] = useState('')
  const [region, setRegion] = useState('Select Region')
  const [team, setTeam] = useState('Select Team')
  const [tis_won, setTis] = useState('0')
  const [playerProfile, setPlayerProfile] = useState('')
  const [prizeMoney, setPrizeMoney] = useState('0')
  const [country, setCountry] = useState('')

  const [previewImage, setImagePreview] = useState(
    '/assets/images/admin/preview_placeholder.png'
  )

  const [errorMessage, setErrorMessage] = useState('')

  const teamDetails = useSelector((state) => state.teamDetails)
  const { teams } = teamDetails

  const playerDetails = useSelector((state) => state.playerDetails)
  const { creating, error, created } = playerDetails

  const dispatch = useDispatch()

  //Custom hook to redirect to login page if the user is not logged in
  useLoginValidation(history)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (
      name === '' ||
      birthDate === '' ||
      alias === '' ||
      steamId === '' ||
      region === 'Select Region' ||
      team === '' ||
      tis_won === '' ||
      playerProfile === '' ||
      country === '' ||
      team === 'Select Team' ||
      role === 'Select Role'
    ) {
      setErrorMessage('Please enter all the fields')
    } else {
      setErrorMessage('')
      const formData = new FormData()
      //Creating Form Data to be sent
      formData.append('name', name)
      formData.append('alias', alias)
      formData.append('role', role)
      formData.append('steam_id', steamId)
      formData.append('profile_image', playerProfile)
      formData.append('date_of_birth', birthDate)
      formData.append('region', region)
      formData.append('country', country)
      formData.append('team', team)
      formData.append('tis_won', tis_won)
      formData.append('prize_money', prizeMoney)
      //Dispatching the Create Team Action
      dispatch(createPlayer(formData))
    }
  }

  const handleModalClose = (e) => {
    resetForm()
    dispatch({ type: CREATE_PLAYER_RESET })
  }

  const resetForm = () => {
    setName('')
    setAlias('')
    setBirthDate('')
    setTeam('')
    setRegion('')
    setCountry('')
    setPrizeMoney('0')
    setTis('0')
    setRole('Select Role')
    setSteamId('')
    setPlayerProfile('')
    setImagePreview('/assets/images/admin/preview_placeholder.png')
  }

  const imageHandler = (e) => {
    setPlayerProfile(e.target.files[0])
    const reader = new FileReader()

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImagePreview(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0])
  }

  useEffect(() => {
    setErrorMessage('')
    resetForm()
  }, [])

  return (
    <>
      <Header />
      <Container style={{ minHeight: '82vh' }}>
        <h3 className='mt-5'>Create New Player</h3>
        <Row>
          <Col md={6}>
            <Form className='mb-5'>
              {errorMessage ? (
                <Message variant='danger'>{errorMessage}</Message>
              ) : error ? (
                <Message variant='danger'>{error}</Message>
              ) : null}
              {created ? (
                <Popup
                  title='Player Creation'
                  body='Player created successfully'
                  type='success'
                  onClose={handleModalClose}
                />
              ) : null}
              <Form.Group controlId='playerName' className='my-3'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter the name of the player'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId='playerBirthDate' className='my-3'>
                <Form.Label>Birth Date</Form.Label>
                <Form.Control
                  type='date'
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId='playerCountry' className='my-3'>
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter the country of the player'
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId='playerAlias' className='my-3'>
                <Form.Label>Alias</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter the In-Game name of the player'
                  value={alias}
                  onChange={(e) => setAlias(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId='playerRole' className='my-3'>
                <Form.Label>Playing Role</Form.Label>
                <Form.Control
                  as='select'
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option>Select Role</option>
                  <option>Carry</option>
                  <option>Mid</option>
                  <option>Offlane</option>
                  <option>Soft Support</option>
                  <option>Hard Support</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId='playerSteamId' className='my-3'>
                <Form.Label>Steam / Account Id</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter the account id of the player'
                  value={steamId}
                  onChange={(e) => setSteamId(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId='playerRegion' className='my-3'>
                <Form.Label>Playing Region</Form.Label>
                <Form.Control
                  as='select'
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                >
                  <option>Select Region</option>
                  <option>EU</option>
                  <option>China</option>
                  <option>SEA</option>
                  <option>NA</option>
                  <option>SA</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Col>
          <Col md={6}>
            <Form>
              <Form.Group controlId='playerTeam' className='my-3'>
                <Form.Label>Team</Form.Label>
                <Form.Control
                  as='select'
                  value={team}
                  onChange={(e) => setTeam(e.target.value)}
                >
                  <option>Select Team</option>
                  {teams.map((team) => (
                    <option value={team._id} key={team._id}>
                      {team.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId='playerTiswon' className='my-3'>
                <Form.Label>Number of TIs (The International won)</Form.Label>
                <Form.Control
                  type='number'
                  value={tis_won}
                  onChange={(e) => setTis(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId='playerPrizeMoney' className='my-3'>
                <Form.Label>Player Prize Money</Form.Label>
                <Form.Control
                  type='number'
                  value={prizeMoney}
                  onChange={(e) => setPrizeMoney(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <ImagePreview
                  path={previewImage}
                  alternate='logo-image'
                  title='Team Logo'
                />
                <Form.File
                  id='playerProfileUpload'
                  onChange={imageHandler}
                  accept='.jpg, .jpeg, .png'
                />
              </Form.Group>
              {creating ? <Loader /> : null}
              <Form.Group className='mt-5'>
                <Button variant='primary' onClick={handleSubmit}>
                  Create
                </Button>
                &nbsp; &nbsp; &nbsp;
                <LinkContainer to='/admin/players'>
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

export default CreatePlayerScreen
