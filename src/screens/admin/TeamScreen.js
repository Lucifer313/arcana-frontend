import { useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../components/Header'

const HomeScreen = ({ history }) => {
  const userDetails = useSelector((state) => state.userDetails)

  const { userInfo } = userDetails

  useEffect(() => {
    if (!userInfo) {
      history.push('/admin/login')
    }
  }, [userInfo, history])

  return (
    <>
      <Header></Header>
      <Container>
        <Row>
          <Col>
            <LinkContainer to='/admin/teams/create'>
              <Button variant='primary' className='my-4'>
                Create Team
              </Button>
            </LinkContainer>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default HomeScreen
