import React from 'react'
import Rules from '../../components/Rules'
import { Container, Row, Col } from 'react-bootstrap'
import Header from '../../components/Layout/User/Header'
import Footer from '../../components/Layout/User/Footer'

const RulesScreen = () => {
  return (
    <>
      <Header />
      <Container style={{ minHeight: '82vh', background: 'black' }}>
        <Row className='py-5'>
          <Col>
            <Rules />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  )
}

export default RulesScreen
