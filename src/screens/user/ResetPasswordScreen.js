import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import Header from '../../components/Layout/User/Header'
import Footer from '../../components/Layout/User/Footer'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { forgotPassword, resetPassword } from '../../actions/user-action'
import {
  FORGOT_PASSWORD_RESET,
  RESET_PASSWORD_RESET,
} from '../../constants/user-constants'
import { useParams } from 'react-router'

const ResetPasswordScreen = () => {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const userDetails = useSelector((state) => state.userDetails)
  const { resetting, reset, error } = userDetails

  const dispatch = useDispatch()

  const { tid } = useParams()

  useEffect(() => {
    setNewPassword('')
    setConfirmPassword('')
    dispatch({
      type: RESET_PASSWORD_RESET,
    })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch({
      type: FORGOT_PASSWORD_RESET,
    })

    if (newPassword.length < 6) {
      setErrorMessage('Password should be of minimum 6 characters')
    } else if (newPassword !== confirmPassword) {
      setErrorMessage('New Password and Confirm Password do not match')
    } else {
      setErrorMessage('')

      dispatch(resetPassword(newPassword, tid))
      setNewPassword('')
      setConfirmPassword('')
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
              <h3 className='my-4'>Reset Password</h3>
              {reset ? (
                <Message variant='success'>
                  Password reset successful. Click here to{' '}
                  <a href='/login'>Login</a>
                </Message>
              ) : null}
              {errorMessage ? (
                <Message variant='danger'>{errorMessage}</Message>
              ) : error ? (
                <Message variant='danger'>{error}</Message>
              ) : null}
              <Form.Group className='my-3'>
                <Form.Label style={{ color: 'white' }}>New Password</Form.Label>
                <Form.Control
                  controlId='new-password'
                  type='text'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group className='my-3'>
                <Form.Label style={{ color: 'white' }}>
                  Confirm Password
                </Form.Label>
                <Form.Control
                  controlId='confirm-password'
                  type='text'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group>{resetting ? <Loader /> : null}</Form.Group>
              <Form.Group className='mt-3'>
                <Button
                  onClick={handleSubmit}
                  className='arcana-btn'
                  style={{
                    backgroundImage: `url(${'/assets/images/user/arcana_button.png'})`,
                    margin: '0px 2% 0px 0px',
                  }}
                >
                  Reset
                </Button>{' '}
                <LinkContainer to='/login' style={{ backgroundColor: 'black' }}>
                  <Button variant='danger' className='arcana-btn'>
                    Login
                  </Button>
                </LinkContainer>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  )
}

export default ResetPasswordScreen
