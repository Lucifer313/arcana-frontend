import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Container, Row, Col, Form, Button } from 'react-bootstrap'

import Footer from '../../components/Layout/User/Footer'
import Header from '../../components/Layout/User/Header'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import Popup from '../../components/Popup'
import { LinkContainer } from 'react-router-bootstrap'
import ImagePreview from '../../components/ImagePreview'
import { updateUser } from '../../actions/user-action'
import { USER_UPDATE_RESET } from '../../constants/user-constants'

const ProfileScreen = ({ history }) => {
  const dispatch = useDispatch()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [alias, setAlias] = useState('')
  const [country, setCountry] = useState('')
  const [date_of_birth, setDateOfBirth] = useState('')
  const [profile_image, setProfileImage] = useState('')

  const [previewImage, setImagePreview] = useState(
    '/assets/images/admin/preview_placeholder.png'
  )

  const [errorMessage, setErrorMessage] = useState('')

  const userDetails = useSelector((state) => state.userDetails)
  const { updating, error, updated, userInfo } = userDetails

  const imageHandler = (e) => {
    setProfileImage(e.target.files[0])
    const reader = new FileReader()

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImagePreview(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0])
  }

  const handleUpdate = (e) => {
    e.preventDefault()

    if (
      firstName === '' ||
      date_of_birth === '' ||
      alias === '' ||
      lastName === '' ||
      country === ''
    ) {
      setErrorMessage('Please enter all the fields')
      window.scrollTo(0, 0)
    } else if (profile_image === '') {
      setErrorMessage('Please select a profile image')
      window.scrollTo(0, 0)
    } else {
      setErrorMessage('')
      const formData = new FormData()
      //Creating Form Data to be sent
      formData.append('first_name', firstName)
      formData.append('last_name', lastName)
      formData.append('alias', alias)
      formData.append('profile_image', profile_image)
      formData.append('date_of_birth', date_of_birth)
      formData.append('country', country)
      formData.append('token', userInfo.token)
      //Dispatching the Create Team Action
      dispatch(updateUser(formData))
      window.scrollTo(0, 0)
    }
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      dispatch({
        type: USER_UPDATE_RESET,
      })

      setFirstName(userInfo.first_name)
      setLastName(userInfo.last_name)
      setAlias(userInfo.alias)
      setCountry(userInfo.country)
      setDateOfBirth(userInfo.date_of_birth)
      setProfileImage(userInfo.profile_image)
      setImagePreview(`http://localhost:7000/${userInfo.profile_image}`)
    }
  }, [userInfo, history])

  return (
    <>
      <Header />
      <Container style={{ minHeight: '82vh' }}>
        <Row>
          <Col>
            <Form className='mt-5'>
              {updated ? (
                <Message variant='success'>
                  Profile updated successfully
                </Message>
              ) : null}
              {errorMessage ? (
                <Message variant='danger'>{errorMessage}</Message>
              ) : error ? (
                <Message variant='danger'>{error}</Message>
              ) : null}
              <h3 className='my-4'>My Profile</h3>
              <Form.Group controlId='firstName' className='my-3'>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter your First Name'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId='lastName' className='my-3'>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter your Last Name'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId='userAlias' className='my-3'>
                <Form.Label>Alias</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter your Alias'
                  value={alias}
                  onChange={(e) => setAlias(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId='userCountry' className='my-3'>
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter your Country'
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId='userDateofBirth' className='my-3'>
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type='date'
                  value={date_of_birth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
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
              <Form.Group>{updating ? <Loader /> : null}</Form.Group>
              <Form.Group className='mt-5 mb-3'>
                <Button
                  className='arcana-btn'
                  variant='primary'
                  onClick={handleUpdate}
                  style={{
                    backgroundImage: `url(${'/assets/images/user/arcana_cracked_button.jpg'})`,
                  }}
                >
                  Update
                </Button>
                &nbsp; &nbsp; &nbsp;
                {/*<LinkContainer to='/'>
                  <Button variant='danger'>Back</Button>
                </LinkContainer>*/}
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  )
}

export default ProfileScreen
