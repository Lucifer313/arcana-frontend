import React, { useState, useEffect } from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import Loader from '../../components/Loader'
import Message from '../../components/Message'
import Footer from '../../components/Layout/Admin/Footer'

import { useDispatch, useSelector } from 'react-redux'

import { login } from '../../actions/user-action'

import './cyborg.css'
import { USER_LOGIN_RESET } from '../../constants/user-constants'

const AdminLoginScreen = ({ history }) => {
  //Defining element states
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const dispatch = useDispatch()

  //Extracting the userDetails slice from the entire state
  const userDetails = useSelector((state) => state.userDetails)

  //Extracting the elements of userDetails state
  const { loading, userInfo, error } = userDetails

  //Login to push to the landing page if the userInfo state is populated
  useEffect(() => {
    if (userInfo !== null) {
      history.push('/')
    } else {
      dispatch({
        type: USER_LOGIN_RESET,
      })
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
    <>
      <Container>
        <Row>
          <Col>
            <Form className='col-md-6 offset-md-3 mt-5'>
              <img
                src='/assets/images/user/arcana_logo_blue.png'
                alt='arcana-logo'
                style={{ width: '70%', marginLeft: '15%' }}
              />
              <img
                src='/assets/images/user/sword_shield_icon.svg'
                alt='sword-icon'
                style={{ width: '20%', marginLeft: '40%' }}
                className='my-3'
              />
              <h1 className='my-2' style={{ fontWeight: '600' }}>
                Login
              </h1>
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
                  className='mt-4'
                  style={{ width: '100%' }}
                >
                  <i class='fa fa-sign-in' aria-hidden='true'></i>
                  Login
                </Button>
                <LinkContainer to='/register' className='mt-3'>
                  <p style={{ color: '#2196f3' }}>
                    Don't have an account? Register here
                  </p>
                </LinkContainer>
                <LinkContainer to='/forgot-password' className='mt-3'>
                  <p style={{ color: '#2196f3 !important' }}>
                    Forgot password? Click here
                  </p>
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

export default AdminLoginScreen
