import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Header from '../../../components/Layout/Header'

import Message from '../../../components/Message'
import Loader from '../../../components/Loader'
import Popup from '../../../components/Popup'

import { updateTeam } from '../../../actions/team-actions'
import { LinkContainer } from 'react-router-bootstrap'
import Footer from '../../../components/Layout/Footer'
import useLoginValidation from '../../../hooks/loginValidatorHook'
import ImagePreview from '../../../components/ImagePreview'
import { UPDATE_TEAM_RESET } from '../../../constants/team-constants'

const EditTeamScreen = ({ history, match }) => {
  const [name, setName] = useState('')
  const [region, setRegion] = useState('EU')
  const [tis_won, setTis] = useState(0)
  const [creationDate, setCreationDate] = useState({})
  const [description, setDescription] = useState('')
  const [logo, setLogo] = useState('')

  const [previewImage, setImagePreview] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  //Extracting TeamDetails slice from the store
  const teamDetails = useSelector((state) => state.teamDetails)
  const { updating, updated, error, teams } = teamDetails

  const dispatch = useDispatch()

  //Redirection logic if not logged in
  useLoginValidation(history)

  /*-----------------------------------CAN BE OPTIMIZED-----------------------------------*/
  useEffect(() => {
    dispatch({
      type: UPDATE_TEAM_RESET,
    })

    const getTeamById = async () => {
      let team

      if (teams.length > 0) {
        //Since filter returns an array we only need first indexed object hence 0
        team = await teams.filter((team) => team._id === match.params.id)[0]
        //Setting the state
        setName(team.name)
        setRegion(team.region)
        setDescription(team.description)
        setCreationDate(team.creation_date)
        setTis(team.tis_won)
        setImagePreview(`http://localhost:7000/${team.logo}`)
        console.log('Logo: ' + team.logo)
      }
    }

    getTeamById()
  }, [])

  /*-------------------------------------------------------------------------------------------------------*/
  //Creating Team function
  const handleUpdate = async () => {
    if (name === '' || description === '' || creationDate === '') {
      setErrorMessage('Plese enter all the details properly')
    } else if (name.length < 2) {
      setErrorMessage('Name of the team should be more than 2 characters')
    } else if (tis_won < 0) {
      setErrorMessage('Number of TIs won should be 0 or more')
    } else {
      let formData = new FormData()
      formData.append('name', name)
      formData.append('region', region)
      formData.append('description', description)

      //Only if new logo is updated
      if (logo !== '') {
        formData.append('logo', logo)
      }

      formData.append('tis_won', tis_won)
      formData.append('creation_date', creationDate)

      dispatch(updateTeam(match.params.id, formData))
    }
  }

  const resetForm = () => {
    setName('')
    setRegion('EU')
    setDescription('')
    setTis(0)
    setCreationDate({})
  }

  const handleModalClose = () => {
    resetForm()
    dispatch({ type: UPDATE_TEAM_RESET })
    history.push('/admin/')
  }

  const imageHandler = (e) => {
    setLogo(e.target.files[0])
    const reader = new FileReader()

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImagePreview(reader.result)
      }
    }

    reader.readAsDataURL(e.target.files[0])
  }

  return (
    <>
      <Header />
      <Container style={{ minHeight: '82vh' }}>
        <Row>
          <>
            <h3 className='mt-5'>Edit Team</h3>
            <Col md='6'>
              <Form className='mt-3'>
                {errorMessage ? (
                  <Message variant='danger'>{errorMessage}</Message>
                ) : error ? (
                  <Message variant='danger'>{error}</Message>
                ) : null}
                {updated ? (
                  <Popup
                    title='Team Update'
                    body='Team updated successfully'
                    type='success'
                    onClose={handleModalClose}
                  />
                ) : null}

                <Form.Group controlId='updateTeam.teamName' className='my-3'>
                  <Form.Label>Team Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter the name of the team'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId='updateTeam.region' className='my-3'>
                  <Form.Label>Playing Region</Form.Label>
                  <Form.Control
                    as='select'
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                  >
                    <option>EU</option>
                    <option>China</option>
                    <option>SEA</option>
                    <option>NA</option>
                    <option>SA</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId='updateTeam.tiswon' className='my-3'>
                  <Form.Label>Number of TIs (The International won)</Form.Label>
                  <Form.Control
                    type='number'
                    value={tis_won}
                    onChange={(e) => setTis(e.target.value)}
                  />
                </Form.Group>
                <Form.Group
                  controlId='updateTeam.creation_date'
                  className='my-3'
                >
                  <Form.Label>Team's foundation date</Form.Label>
                  <Form.Control
                    type='date'
                    value={creationDate}
                    onChange={(e) => setCreationDate(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col md='6'>
              <Form.Group>
                <ImagePreview
                  path={previewImage}
                  alternate='logo-image'
                  title='Team Logo'
                />
                <Form.File
                  id='logoUpload'
                  onChange={imageHandler}
                  accept='.jpg, .jpeg, .png'
                />
              </Form.Group>
              <Form className='mt-3'>
                <Form.Group controlId='updateTeam.description' className='my-3'>
                  <Form.Label>Team Description / Bio</Form.Label>
                  <Form.Control
                    as='textarea'
                    rows={6}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>
                {updating ? <Loader className='my-3' /> : null}
                <Form.Group>
                  <Button variant='primary' onClick={handleUpdate}>
                    Update
                  </Button>
                  &nbsp; &nbsp; &nbsp;
                  <LinkContainer to='/admin'>
                    <Button variant='danger'>Back</Button>
                  </LinkContainer>
                </Form.Group>
              </Form>
            </Col>
          </>
        </Row>
        :
      </Container>
      <Footer />
    </>
  )
}

export default EditTeamScreen
