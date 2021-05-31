import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Header from '../../components/Header'

import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Popup from '../../components/Popup'

import { createTeam } from '../../actions/team-actions'
import { LinkContainer } from 'react-router-bootstrap'

const CreateTeamScreen = ({ history }) => {
  const [name, setName] = useState('')
  const [region, setRegion] = useState('EU')
  const [tis_won, setTis] = useState(0)
  const [creationDate, setCreationDate] = useState('')
  const [description, setDescription] = useState('')

  const [showModal, setShowModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  //Extract User Details slice from the Store
  const userDetails = useSelector((state) => state.userDetails)
  const { userInfo } = userDetails

  //Extracting TeamDetails slice from the store
  const teamDetails = useSelector((state) => state.teamDetails)
  const { loading, success, error } = teamDetails

  const dispatch = useDispatch()

  //Redirection logic if not logged in
  useEffect(() => {
    if (!userInfo) {
      history.push('/admin/login')
    }
  }, [userInfo, history])

  useEffect(() => {
    setShowModal(false)
    setErrorMessage('')
    resetForm()
  }, [])

  //Creating Team function
  const handleSubmit = (e) => {
    if (name === '' || description === '' || creationDate === '') {
      setErrorMessage('Plese enter all the details properly')
    } else if (name.length < 2) {
      setErrorMessage('Name of the team should be more than 2 characters')
    } else if (tis_won < 0) {
      setErrorMessage('Number of TIs won should be 0 or more')
    } else {
      dispatch(createTeam(name, region, description, tis_won, creationDate))
      if (success) {
        setErrorMessage('')
        setShowModal(true)
        resetForm()
      }
    }
  }

  const resetForm = () => {
    setName('')
    setRegion('EU')
    setDescription('')
    setTis(0)
    setCreationDate('')
  }

  return (
    <>
      <Header />
      <Container>
        <Row>
          <h3 className='mt-5'>Create New Team</h3>
          <Col md='6'>
            <Form className='mt-3'>
              {errorMessage ? (
                <Message variant='danger'>{errorMessage}</Message>
              ) : error ? (
                <Message variant='danger'>{error}</Message>
              ) : null}
              {showModal ? (
                <Popup
                  title='Team Creation'
                  body='Team created successfully'
                  type='success'
                  onClose={() => setShowModal(false)}
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
              <Form.Group controlId='createTeam.creation_date' className='my-3'>
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
            <Form className='mt-3'>
              <Form.Group
                controlId='exampleForm.ControlTextarea1'
                className='my-3'
              >
                <Form.Label>Team Description / Bio</Form.Label>
                <Form.Control
                  as='textarea'
                  rows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              {loading ? <Loader className='my-3' /> : null}
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
    </>
  )
}

export default CreateTeamScreen
