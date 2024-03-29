import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import dotenv from 'dotenv'
import { useSelector, useDispatch } from 'react-redux'

import Footer from '../../../components/Layout/Admin/Footer'
import Header from '../../../components/Layout/Admin/Header'
import Loader from '../../../components/Loader'
import Message from '../../../components/Message'
import Popup from '../../../components/Popup'

import useLoginValidation from '../../../hooks/loginValidatorHook'
import { UPDATE_PLAYER_RESET } from '../../../constants/player-constants'
import { updatePlayer } from '../../../actions/player-action'
import ImagePreview from '../../../components/ImagePreview'

dotenv.config()

const EditPlayerScreen = ({ history, match }) => {
  const [birthDate, setBirthDate] = useState('')
  const [alias, setAlias] = useState('')
  const [role, setRole] = useState('Carry')
  const [region, setRegion] = useState('Select Region')
  const [team, setTeam] = useState('Select Team')
  const [tis_won, setTis] = useState('0')
  const [playerProfile, setPlayerProfile] = useState('')
  const [country, setCountry] = useState('')

  const [previewImage, setImagePreview] = useState(
    '/assets/images/admin/preview_placeholder.png'
  )

  const [errorMessage, setErrorMessage] = useState('')

  const teamDetails = useSelector((state) => state.teamDetails)
  const { teams } = teamDetails

  const playerDetails = useSelector((state) => state.playerDetails)
  const { updating, error, updated, players } = playerDetails

  const dispatch = useDispatch()

  //Custom hook to redirect to login page if the user is not logged in
  useLoginValidation(history)

  const handleUpdate = (e) => {
    e.preventDefault()
    if (
      birthDate === '' ||
      alias === '' ||
      region === 'Select Region' ||
      team === '' ||
      tis_won === '' ||
      country === '' ||
      team === 'Select Team' ||
      role === 'Select Role'
    ) {
      setErrorMessage('Please enter all the fields')
    } else {
      setErrorMessage('')
      const formData = new FormData()
      //Creating Form Data to be sent
      formData.append('alias', alias)
      formData.append('role', role)

      //Only if new image is added pass it as Form Data
      if (playerProfile !== '') {
        formData.append('profile_image', playerProfile)
      }

      formData.append('date_of_birth', birthDate)
      formData.append('region', region)
      formData.append('country', country)
      formData.append('team', team)
      formData.append('tis_won', tis_won)
      //Dispatching the Create Team Action
      dispatch(updatePlayer(match.params.id, formData))
    }
  }

  const handleModalClose = () => {
    dispatch({ type: UPDATE_PLAYER_RESET })
    history.push('/admin/players')
  }

  const resetForm = () => {
    setAlias('')
    setBirthDate('')
    setTeam('')
    setRegion('')
    setCountry('')
    setTis('0')
    setRole('Select Role')
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
    dispatch({ type: UPDATE_PLAYER_RESET })
    setErrorMessage('')
    resetForm()
  }, [])

  useEffect(() => {
    const getPlayerById = async () => {
      let player

      if (players.length > 0) {
        //Since filter returns an array we only need first indexed object hence 0
        player = await players.filter(
          (player) => player._id === match.params.id
        )[0]
        //Setting the state
        setAlias(player.alias)
        setBirthDate(player.date_of_birth)
        setTeam(player.team._id)
        setRegion(player.region)
        setCountry(player.country)
        setTis(player.tis_won)
        setRole(player.role)
        setImagePreview(process.env.REACT_APP_SERVER_URL + player.profile_image)
      }
    }

    getPlayerById()
  }, [])

  return (
    <>
      <Header />
      <Container style={{ minHeight: '82vh' }}>
        <h3 className='mt-5'>Edit Player</h3>
        <Row>
          <Col md={6}>
            <Form className='mb-5'>
              {errorMessage ? (
                <Message variant='danger'>{errorMessage}</Message>
              ) : error ? (
                <Message variant='danger'>{error}</Message>
              ) : null}
              {updated ? (
                <Popup
                  title='Player Update'
                  body='Player updated successfully'
                  type='success'
                  onClose={handleModalClose}
                />
              ) : null}
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
            </Form>
          </Col>
          <Col md={6}>
            <Form>
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
              {updating ? <Loader /> : null}
              <Form.Group className='mt-5'>
                <Button variant='primary' onClick={handleUpdate}>
                  Update
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

export default EditPlayerScreen
