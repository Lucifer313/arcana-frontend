import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import Header from '../../components/Layout/User/Header'
import Footer from '../../components/Layout/User/Footer'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { forgotPassword } from '../../actions/user-action'
import { FORGOT_PASSWORD_RESET } from '../../constants/user-constants'

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, loaded, error } = userDetails

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({
      type: FORGOT_PASSWORD_RESET,
    })
    setEmail('')
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch({
      type: FORGOT_PASSWORD_RESET,
    })

    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (email === '') {
      setErrorMessage('Please enter an email address.')
    } else if (!re.test(email)) {
      setErrorMessage(
        'The email address is invalid. Please provide a valid Email address'
      )
    } else {
      setErrorMessage('')
      setEmail('')
      dispatch(forgotPassword(email))
    }
  }

  return (
    <div>
      <Container
        style={{
          minHeight: '100vh',
          backgroundImage: `url(${'/assets/images/user/arcana-landing-page.jpg'})`,
          backgroundSize: 'cover',
        }}
      >
        <Row>
          <Col lg={6} md={12} className='d-block mx-auto'>
            <Form>
              <h3 className='my-4'>Forgot Password</h3>
              <p style={{ color: 'white' }}>
                Enter your email address. We will send a link to reset your
                password
              </p>
              {loaded ? (
                <Message variant='success'>
                  Reset Password link sent successfully. Please check your
                  mailbox for the email and follow the steps to reset your
                  password
                </Message>
              ) : null}
              {errorMessage ? (
                <Message variant='danger'>{errorMessage}</Message>
              ) : error ? (
                <Message variant='danger'>{error}</Message>
              ) : null}
              <Form.Group>
                <Form.Label style={{ color: '#dcb570' }}>
                  Your Registered Email Address
                </Form.Label>
                <Form.Control
                  controlId='forgot-email'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group>{loading ? <Loader /> : null}</Form.Group>
              <Form.Group className='mt-3'>
                <Button
                  onClick={handleSubmit}
                  className='arcana-btn'
                  style={{
                    backgroundImage: `url(${'/assets/images/user/arcana_button.png'})`,
                  }}
                >
                  Submit
                </Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  )
}

export default ForgotPasswordScreen
