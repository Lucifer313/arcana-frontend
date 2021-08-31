import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

const DeclareWinnerScreen = () => {
  const [winner, setWinner] = useState('')

  const dispatch = useDispatch()
  const tournamentDetails = useSelector((state) => state.tournamentDetails)

  const {
    qualifiedTeams: { teams },
  } = tournamentDetails

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Form>
              <h3 className='mt-3'>Declare the Tournament Winner</h3>
              <Form.Group>
                <Form.Label></Form.Label>
                <Form.Control
                  as='select'
                  value={winner}
                  onChange={(e) => setWinner(e.target.value)}
                >
                  {teams.map((team) => {
                    return <option value={team._id}>{team.name}</option>
                  })}
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Button variant='success' className='mt-3'>
                  Declare Winner
                </Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default DeclareWinnerScreen
