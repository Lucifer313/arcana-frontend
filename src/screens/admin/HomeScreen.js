import { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
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
            <h1>Welcome Home</h1>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default HomeScreen
