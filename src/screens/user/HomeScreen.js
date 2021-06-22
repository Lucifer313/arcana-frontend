import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import Footer from '../../components/Layout/User/Footer'
import Header from '../../components/Layout/User/Header'
import useLoginValidation from '../../hooks/userLoginValidatorHook'

const HomeScreen = ({ history }) => {
  useLoginValidation(history)

  return (
    <>
      <Header />
      <div className='user-screen-container'>
        <Container></Container>
      </div>
      <Footer />
    </>
  )
}

export default HomeScreen
