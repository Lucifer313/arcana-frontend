import React, { useState, useEffect } from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import Loader from '../../components/Loader'
import Message from '../../components/Message'
import Footer from '../../components/Layout/User/Footer'

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
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (email === '' || password === '') {
      setErrorMessage('Please provide the email address and password')
    } else if (!re.test(email)) {
      setErrorMessage('Please provide a valid email address')
    } else {
      setErrorMessage('')
      dispatch(login(email, password))
    }
  }

  return (
    <>
      <Container
        style={{
          minHeight: '93vh',
          backgroundImage: `url(${'/assets/images/user/arcana-landing-page.jpg'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Row>
          <Col>
            <Form className='col-md-6 offset-md-3 mt-5'>
              <img
                src='/assets/images/user/arcana_logo.png'
                alt='arcana-logo'
                style={{ width: '70%', marginLeft: '15%' }}
                className='mb-5'
              />

              <h1 className='mb-2 mt-5' style={{ fontWeight: '600' }}>
                Login
              </h1>
              {errorMessage ? (
                <Message variant='danger'>{errorMessage}</Message>
              ) : error ? (
                <Message variant='danger'>{error}</Message>
              ) : null}
              <Form.Group controlId='formBasicEmail'>
                <Form.Label style={{ color: 'white' }}>
                  Email address
                </Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId='formBasicPassword' className='mt-2'>
                <Form.Label style={{ color: 'white' }}>Password</Form.Label>
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
                  type='submit'
                  onClick={handleSubmit}
                  className='mt-4'
                  style={{
                    width: '100%',
                    padding: '4%',
                    backgroundSize: 'cover',
                    backgroundImage: `url(${'/assets/images/user/arcana_button.png'})`,
                  }}
                >
                  Login
                </Button>
                <LinkContainer
                  to='/register'
                  className='mt-3'
                  style={{ color: '#c4c4c4' }}
                >
                  <p>Don't have an account? Register here</p>
                </LinkContainer>
                <LinkContainer
                  to='/forgot-password'
                  className='mt-3'
                  style={{ color: '#c4c4c4' }}
                >
                  <p>Forgot password? Click here</p>
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
