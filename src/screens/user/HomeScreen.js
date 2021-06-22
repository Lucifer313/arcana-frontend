import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Row, Table, Button } from 'react-bootstrap'
import Footer from '../../components/Layout/User/Footer'
import Header from '../../components/Layout/User/Header'
import useLoginValidation from '../../hooks/userLoginValidatorHook'
import { getTournaments } from '../../actions/tournament-action'
import { LinkContainer } from 'react-router-bootstrap'

const HomeScreen = ({ history }) => {
  useLoginValidation(history)

  const dispatch = useDispatch()

  const tournamentDetails = useSelector((state) => state.tournamentDetails)
  const { tournaments } = tournamentDetails

  useEffect(() => {
    dispatch(getTournaments())
  }, [])

  return (
    <>
      <Header />
      <div className='user-screen-container'>
        <Container style={{ minHeight: '82vh' }}>
          <Row>
            <Table striped hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Tier</th>
                  <th>Teams</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {tournaments.map((tournament) => (
                  <tr>
                    <td>{tournament.name}</td>
                    <td>{tournament.tier}</td>
                    <td>{tournament.number_of_teams}</td>
                    <td>
                      <LinkContainer
                        to={`/tournaments/${tournament._id}/create-team`}
                      >
                        <Button variant='primary'>Join</Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  )
}

export default HomeScreen
