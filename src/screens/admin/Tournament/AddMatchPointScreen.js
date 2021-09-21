import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Message from '../../../components/Message'
import Popup from '../../../components/Popup'
import Loader from '../../../components/Loader'
import { ADD_MATCH_POINTS_RESET } from '../../../constants/tournament-constants'
import { addMatchPoints } from '../../../actions/tournament-action'
import { useParams } from 'react-router-dom'

const AddMatchPointScreen = () => {
  const { tid } = useParams()

  const [matchId, setMatchId] = useState('')
  const [dayNum, setDayNum] = useState(0)
  const [matchNum, setMatchNum] = useState(0)
  const [team1, setTeam1] = useState('')
  const [team2, setTeam2] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const tournamentDetails = useSelector((state) => state.tournamentDetails)

  const { qualifiedTeams, error, inserting, inserted } = tournamentDetails

  const dispatch = useDispatch()

  const handleAddPoints = (e) => {
    e.preventDefault()

    if (matchId === 0 || dayNum === 0 || matchNum === 0) {
      setErrorMessage('Please enter all the fields')
    } else if (team1 === team2) {
      setErrorMessage('Team 1 and Team 2 selection should be different')
    } else {
      dispatch(addMatchPoints(tid, matchId, dayNum, matchNum, team1, team2))
    }
  }

  const handleModalClose = () => {
    setMatchId('')
    setMatchNum('')
    setDayNum('')
    setTeam1('')
    setTeam2('')
    dispatch({ type: ADD_MATCH_POINTS_RESET })
  }

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Form className='my-3'>
              <h3>Add Match Points</h3>

              {errorMessage ? (
                <Message variant='danger'>{errorMessage}</Message>
              ) : error ? (
                <Message variant='danger'>{error}</Message>
              ) : null}
              {inserted ? (
                <Popup
                  title='Match Points Addition'
                  body='Match Points added successfully'
                  type='success'
                  onClose={handleModalClose}
                />
              ) : null}
              <Form.Group controlId='addMatchPoint.matchID' className='my-3'>
                <Form.Label>Dota 2 Match ID</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter the Dota 2  match ID'
                  value={matchId}
                  onChange={(e) => setMatchId(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId='addMatchPoints.team1' className='my-3'>
                <Form.Label>Team 1</Form.Label>
                <Form.Control
                  as='select'
                  value={team1}
                  onChange={(e) => setTeam1(e.target.value)}
                >
                  {qualifiedTeams.teams.map((team) => {
                    return <option value={team._id}>{team.name}</option>
                  })}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId='addMatchPoints.team2' className='my-3'>
                <Form.Label>Team 2</Form.Label>
                <Form.Control
                  as='select'
                  value={team2}
                  onChange={(e) => setTeam2(e.target.value)}
                >
                  {qualifiedTeams.teams.map((team) => {
                    return <option value={team._id}>{team.name}</option>
                  })}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId='addMatchPoint.dayNum' className='my-3'>
                <Form.Label>Day Number</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter the day-number of the tournament'
                  value={dayNum}
                  onChange={(e) => setDayNum(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId='addMatchPoints.matchNum' className='my-3'>
                <Form.Label>Match Number</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter the match-number of the tournament'
                  value={matchNum}
                  onChange={(e) => setMatchNum(e.target.value)}
                />
              </Form.Group>
              {inserting ? <Loader /> : null}
              <Button variant='primary' onClick={handleAddPoints}>
                Add Points
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default AddMatchPointScreen
