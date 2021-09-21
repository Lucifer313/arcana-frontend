import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import Header from '../../components/Layout/User/Header'
import Footer from '../../components/Layout/User/Footer'
import Message from '../../components/Message'
import Loader from '../../components/Loader'

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, loaded, error } = userDetails

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()

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
      alert('Valid email address')
    }
  }

  return (
    <div>
      <Header />
      <Container style={{ minHeight: '82vh' }}>
        <Row>
          <Col lg={6} md={12} className='d-block mx-auto'>
            <Form className='mt-5'>
              <h3>Forgot Password</h3>
              <p>
                Enter your email address. We will send a link to reset your
                password
              </p>
              {errorMessage ? (
                <Message variant='danger'>{errorMessage}</Message>
              ) : error ? (
                <Message variant='danger'>{error}</Message>
              ) : null}
              <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  controlId='forgot-email'
                  placeholder='Enter your registered email address'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group>{loading ? <Loader /> : null}</Form.Group>
              <Form.Group className='mt-3'>
                <Button onClick={handleSubmit}>Submit</Button>
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
