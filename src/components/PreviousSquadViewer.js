import React, { useState, useEffect } from 'react'
import { Container, Col, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import axios from 'axios'

import { getMyTournaments, getSquadByDay } from '../actions/user-action'
import Footer from './Layout/User/Footer'
import Header from './Layout/User/Header'
import Loader from './Loader'
import SelectedSquad from './SelectedSquad'

const PreviousSquadViewer = ({ navigation, history }) => {
  const [showSubstitueSquad, setShowSubstitueSquad] = useState(false)
  const [previousSquadFilter, setPreviousSquadFilter] = useState(false)

  const dispatch = useDispatch()

  const { tid } = useParams()

  const userDetails = useSelector((state) => state.userDetails)
  const { myTournaments, userInfo, previousSquad, loading } = userDetails

  let tournament = myTournaments.filter((t) => t._id === tid)[0]

  const { playingSquad, reserveSquad } = previousSquad

  let tournamentDays = tournament.days.length

  const [day, setDay] = useState(tournament.days.length)

  useEffect(() => {
    //dispatch(getMyTournaments(userInfo._id, tid))
    if (tournamentDays > 0 && userInfo) {
      dispatch(getSquadByDay(userInfo._id, tid, tournamentDays.toString()))
    }
  }, [tournament, tid, userInfo, dispatch])

  useEffect(() => {
    const getMatchData = async () => {
      let matchDetails = await axios.get(
        `https://api.opendota.com/api/matches/6033763787`
      )
      console.log(matchDetails)
    }

    getMatchData()
  }, [])

  const getPreviousSquadHandler = (selectedDay) => {
    setDay(selectedDay)
    dispatch(getSquadByDay(userInfo._id, tid, selectedDay))
  }

  return (
    <>
      <Container
        style={{
          backgroundImage: `url(${'/assets/images/user/aegis-ti10.jpg'})`,
        }}
      >
        <Col>
          <>
            {!previousSquadFilter ? (
              <Button
                className='my-2 mx-0 arcana-btn'
                style={{ backgroundColor: 'black' }}
                onClick={() => setPreviousSquadFilter(true)}
              >
                Show Filter
              </Button>
            ) : (
              <>
                <Button
                  className='my-2 arcana-btn'
                  style={{
                    backgroundColor: 'black',
                    margin: '0px 2.5% 0px 0px',
                  }}
                  onClick={() => setPreviousSquadFilter(false)}
                >
                  Hide Filter
                </Button>
                <Button
                  style={{ float: 'right' }}
                  className='my-2 arcana-btn'
                  style={{
                    backgroundColor: 'black',
                    margin: '0px 0px 0px 2.5%',
                  }}
                  onClick={() =>
                    getPreviousSquadHandler(tournament.days.length.toString())
                  }
                >
                  Clear Filter
                </Button>
              </>
            )}
            {previousSquadFilter ? (
              <>
                <Form.Group controlId='squadDay' className='my-3'>
                  <Form.Label style={{ color: '#dcb570' }}>
                    View Squads of Previous Days
                  </Form.Label>
                  <Form.Control
                    as='select'
                    value={day}
                    onChange={(e) => getPreviousSquadHandler(e.target.value)}
                  >
                    <option selected disabled style={{ color: '#dcb570 ' }}>
                      Select previous day
                    </option>
                    {tournament.days.map((t) => {
                      return <option value={t.day}>{t.day}</option>
                    })}
                  </Form.Control>
                </Form.Group>
              </>
            ) : null}
            {loading ? (
              <div style={{ width: '10%', margin: 'auto' }}>
                <Loader />
              </div>
            ) : null}
            <div style={{ minHeight: '60vh' }}>
              <SelectedSquad
                squad={playingSquad}
                squadType='playing'
                title={`Squad selected for Day ${day}`}
              />
            </div>
            <div>
              {!showSubstitueSquad ? (
                <Button
                  className='my-2 arcana-btn'
                  style={{ backgroundColor: 'black' }}
                  onClick={() => setShowSubstitueSquad(true)}
                >
                  Show Subs
                </Button>
              ) : (
                <Button
                  className='my-2 arcana-btn'
                  style={{ backgroundColor: 'black' }}
                  onClick={() => setShowSubstitueSquad(false)}
                >
                  Hide Subs
                </Button>
              )}
            </div>
          </>
        </Col>

        {showSubstitueSquad ? (
          reserveSquad && reserveSquad.length > 0 ? (
            <SelectedSquad
              squad={reserveSquad}
              squadType='reserve'
              title={`Substitutes for Day ${day}`}
            />
          ) : null
        ) : null}
      </Container>
    </>
  )
}

export default PreviousSquadViewer
