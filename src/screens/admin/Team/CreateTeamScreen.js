import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import Header from '../../../components/Layout/Admin/Header'
import Message from '../../../components/Message'
import Loader from '../../../components/Loader'
import Popup from '../../../components/Popup'

import { createTeam, resetTeamCreation } from '../../../actions/team-actions'
import Footer from '../../../components/Layout/Admin/Footer'
import useLoginValidation from '../../../hooks/loginValidatorHook'
import { CREATE_TEAM_RESET } from '../../../constants/team-constants'
import ImagePreview from '../../../components/ImagePreview'

const CreateTeamScreen = ({ history }) => {
  //State variables
  const [name, setName] = useState('')
  const [region, setRegion] = useState('EU')
  const [tis_won, setTis] = useState(0)
  const [best_performance, setBestPerformance] = useState('')
  const [description, setDescription] = useState('')
  const [logo, setLogo] = useState('')
  const [achievements, setAchievements] = useState('')

  const [errorMessage, setErrorMessage] = useState('')
  const [previewImage, setImagePreview] = useState(
    '/assets/images/admin/preview_placeholder.png'
  )

  //Extracting TeamDetails slice from the store
  const teamDetails = useSelector((state) => state.teamDetails)
  const { creating, created, error } = teamDetails

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
    if (name === '' || description === '') {
      setErrorMessage('Plese enter all the details properly')
    } else if (name.length < 2) {
      setErrorMessage('Name of the team should be more than 2 characters')
    } else if (tis_won < 0) {
      setErrorMessage('Number of TIs won should be 0 or more')
    } else {
      //Dispatching the action to createTeam
      const formData = new FormData()
      formData.append('name', name)
      formData.append('region', region)
      formData.append('description', description)
      formData.append('logo', logo)
      formData.append('tis_won', tis_won)
      formData.append('best_performance', best_performance)
      formData.append('achievements', achievements)

      dispatch(createTeam(formData))
    }
  }

  //Function to close the success popup
  const handleModalClose = () => {
    resetForm()
    dispatch({ type: CREATE_TEAM_RESET })
  }

  //Function to reset the form
  const resetForm = () => {
    setName('')
    setRegion('EU')
    setDescription('')
    setTis(0)
    setLogo('')
    setErrorMessage('')
    setAchievements('')
    setBestPerformance('')
    setImagePreview('/assets/images/admin/preview_placeholder.png')
  }

  //Image preview Handler
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
      <Container style={{ minHeight: '82vh' }} className='mb-5'>
        <Row>
          <h3 className='mt-5'>Create New Team</h3>
          <Col md='6'>
            <Form className='mt-3 mb-5'>
              {errorMessage ? (
                <Message variant='danger'>{errorMessage}</Message>
              ) : error ? (
                <Message variant='danger'>{error}</Message>
              ) : null}
              {created ? (
                <Popup
                  title='Team Creation'
                  body='Team created successfully'
                  type='success'
                  onClose={handleModalClose}
                />
              ) : null}

              <Form.Group controlId='createTeam.teamName' className='my-3'>
                <Form.Label>Team Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter the name of the team'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId='createTeam.region' className='my-3'>
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
              <Form.Group controlId='createTeam.tiswon' className='my-3'>
                <Form.Label>Number of TIs (The International won)</Form.Label>
                <Form.Control
                  type='number'
                  value={tis_won}
                  onChange={(e) => setTis(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                controlId='createTeam.bestPerformance'
                className='my-3'
              >
                <Form.Label>Best Performance in TI</Form.Label>
                <Form.Control
                  type='text'
                  value={best_performance}
                  onChange={(e) => setBestPerformance(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId='createTeam.achievements' className='my-3'>
                <Form.Label>Latest Achievements</Form.Label>
                <Form.Control
                  type='text'
                  value={achievements}
                  onChange={(e) => setAchievements(e.target.value)}
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
              <Form.Group controlId='createTeam.description' className='my-3'>
                <Form.Label>Team Description / Bio</Form.Label>
                <Form.Control
                  as='textarea'
                  rows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>

              {creating ? <Loader className='my-3' /> : null}
              <Form.Group>
                <Button variant='primary' onClick={handleSubmit}>
                  Create
                </Button>
                &nbsp; &nbsp; &nbsp;
                <LinkContainer to='/admin'>
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

export default CreateTeamScreen
