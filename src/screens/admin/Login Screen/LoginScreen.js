import React, { useState, useEffect } from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'

import Loader from '../../../components/Loader'
import Message from '../../../components/Message'

import { useDispatch, useSelector } from 'react-redux'

import { login } from '../../../actions/user-action'

import './../cyborg.css'
import './loginscreen.css'

const LoginScreen = ({ history }) => {
  //Defining element states
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const dispatch = useDispatch()

  //Extracting the userDetails slice from the entire state
  const userDetails = useSelector((state) => state.userDetails)

  //Extracting the elements of userDetails state
  const { loading, userInfo, error } = userDetails

  //Login to push to the name page if the userInfo state is populated
  useEffect(() => {
    if (userInfo) {
      history.push('/admin/')
    }
  }, [userInfo, history])

  //Login function
  const handleSubmit = (e) => {
    e.preventDefault()

    if (email === '' || password === '') {
      setErrorMessage('Please provide the email address and password')
    } else {
      setErrorMessage('')
      dispatch(login(email, password))
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          <Form className='col-md-6 offset-md-3 mt-5'>
            <h2 className='text-center'>Arcana League</h2>
            {errorMessage ? (
              <Message variant='danger'>{errorMessage}</Message>
            ) : error ? (
              <Message variant='danger'>{error}</Message>
            ) : null}
            <Form.Group controlId='formBasicEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='formBasicPassword' className='mt-2'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group>{loading ? <Loader /> : null}</Form.Group>
            <Form.Group>
              <Button
                variant='primary'
                type='submit'
                onClick={handleSubmit}
                className='mt-4 col-md-3'
              >
                Submit
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginScreen
