import React, { useState, useEffect } from 'react'
import { Col, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'

import { getMyTournaments, getSquadByDay } from '../actions/user-action'
import Loader from './Loader'
import SelectedSquad from './SelectedSquad'

const PreviousSquadViewer = ({ navigation }) => {
  const [showSubstitueSquad, setShowSubstitueSquad] = useState(false)
  const [previousSquadFilter, setPreviousSquadFilter] = useState(false)

  const dispatch = useDispatch()

  const { tid } = useParams()

  const userDetails = useSelector((state) => state.userDetails)
  const { myTournaments, userInfo, previousSquad, loading } = userDetails

  let tournament = myTournaments.filter((t) => t._id === tid)[0]

  const { playingSquad, reserveSquad } = previousSquad

  let tournamentDays = tournament.days.length - 1
  console.log(typeof tournamentDays)

  const [day, setDay] = useState(tournament.days.length - 1)

  useEffect(() => {
    //dispatch(getMyTournaments(userInfo._id, tid))
    if (tournamentDays > 0) {
      dispatch(
        getSquadByDay(userInfo._id, tid, tournamentDays.toString(), 'previous')
      )
    }
  }, [tournament, tid, userInfo._id, dispatch])

  const getPreviousSquadHandler = (selectedDay, mode) => {
    setDay(selectedDay)
    dispatch(getSquadByDay(userInfo._id, tid, selectedDay, mode))
  }

  return (
    <>
      <Col>
        <>
          {!previousSquadFilter ? (
            <Button
              variant='success'
              className='my-2'
              onClick={() => setPreviousSquadFilter(true)}
            >
              Show Filter
            </Button>
          ) : (
            <>
              <Button
                variant='danger'
                className='my-2'
                onClick={() => setPreviousSquadFilter(false)}
              >
                Hide Filter
              </Button>
              <Button
                style={{ float: 'right' }}
                variant='warning'
                className='my-2'
                onClick={() =>
                  getPreviousSquadHandler(
                    (tournament.days.length - 1).toString(),
                    'previous'
                  )
                }
              >
                Clear Filter
              </Button>
            </>
          )}
          {previousSquadFilter ? (
            <>
              <Form.Group controlId='squadDay' className='my-3'>
                <Form.Label>View Squads of Previous Days</Form.Label>
                <Form.Control
                  as='select'
                  value={day}
                  onChange={(e) =>
                    getPreviousSquadHandler(e.target.value, 'previous')
                  }
                >
                  <option selected>Select previous day</option>
                  {tournament.days.map((t) => {
                    if (t.day < tournament.days.length) {
                      return <option value={t.day}>{t.day}</option>
                    }
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
          <div style={{ minHeight: '74vh' }}>
            {playingSquad && playingSquad.length > 0 ? (
              <SelectedSquad
                squad={playingSquad}
                title={`Squad selected for Day ${day}`}
              />
            ) : null}
          </div>
          <div>
            <Button
              variant='danger'
              className='my-2'
              onClick={() => navigation.goBack()}
            >
              Back
            </Button>{' '}
            {!showSubstitueSquad ? (
              <Button
                className='my-2'
                variant='success'
                onClick={() => setShowSubstitueSquad(true)}
              >
                Show Subs
              </Button>
            ) : (
              <Button
                className='my-2'
                variant='danger'
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
            title={`Substitutes for Day ${day}`}
          />
        ) : null
      ) : null}
    </>
  )
}

export default PreviousSquadViewer
