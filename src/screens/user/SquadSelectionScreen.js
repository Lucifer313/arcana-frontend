import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Table, Button } from 'react-bootstrap'
import { useParams } from 'react-router'
import Moment from 'moment'

import { useSelector, useDispatch } from 'react-redux'
import Footer from '../../components/Layout/User/Footer'
import Header from '../../components/Layout/User/Header'

import SelectTeamList from '../../components/SelectTeamList'
import { getQualifiedPlayers } from '../../actions/tournament-action'
import { LinkContainer } from 'react-router-bootstrap'
import {
  getMyTournaments,
  getSquadAddingPermission,
  submitPlayingSquad,
} from '../../actions/user-action'

import Popup from '../../components/Popup'
import Logo from '../../components/Logo'

const TournamentDetailScreen = ({ match, history }) => {
  const [playingSquad, setPlayingSquad] = useState([])
  //const [reserveSquad, setReserveSquad] = useState([])

  const dispatch = useDispatch()

  const { tid } = useParams()

  const userDetails = useSelector((state) => state.userDetails)
  const { myTournaments, userInfo, allowed } = userDetails

  const tournamentDetails = useSelector((state) => state.tournamentDetails)
  const { qualifiedPlayers } = tournamentDetails

  let tournament = myTournaments.filter((t) => t._id === tid)[0]

  //Extracting the arcana squad for this tournament
  let arcanaTeamIds = tournament.arcanaTeam

  //Extracting the latest  event day created for the selected  tournament
  let eventDay = tournament.days[tournament.days.length - 1]
  let squad
  let substitutes
  let substitutDetails = []
  let squadDetails = []
  //Extracting the playing squad
  if (eventDay) {
    squad = eventDay.playingSquad
    substitutes = eventDay.reserveSquad
    substitutDetails = qualifiedPlayers.filter((player) =>
      substitutes.includes(player._id)
    )
    squadDetails = qualifiedPlayers.filter((player) =>
      squad.includes(player._id)
    )
  }
  //Genrating the details of the playing squad

  //Extracting the subs

  //Generating the sub details

  let eventDayNum = tournament.days.length

  let myArcanaTeam = qualifiedPlayers.filter((player) =>
    arcanaTeamIds.includes(player._id)
  )

  const [errorMessage, setErrorMessage] = useState('')

  const addPlayingSquad = (playerId) => {
    let acceptable = true

    if (playingSquad.length === 5) {
      setErrorMessage('You can only select 5 players for the Playing Squad')
    } else {
      //Getting the New Player Role
      let newPlayerRole = qualifiedPlayers.filter(
        (player) => player._id === playerId
      )[0].role

      let selectedPlayerDetails = qualifiedPlayers.filter((player) =>
        playingSquad.includes(player._id)
      )

      let playerWithSameRole

      if (newPlayerRole === 'Offlane') {
        playerWithSameRole = selectedPlayerDetails.filter(
          (player) => player.role === newPlayerRole
        )
        if (playerWithSameRole.length === 1) {
          setErrorMessage('Only 1 Offlaner can be selected')
          acceptable = false
        }
      } else if (newPlayerRole === 'Carry' || newPlayerRole === 'Mid') {
        playerWithSameRole = selectedPlayerDetails.filter(
          (player) => player.role === 'Carry' || player.role === 'Mid'
        )
        if (playerWithSameRole.length === 2) {
          setErrorMessage('Only 2 Core players can be selected')
          acceptable = false
        }
      } else {
        playerWithSameRole = selectedPlayerDetails.filter(
          (player) =>
            player.role === 'Hard Support' || player.role === 'Soft Support'
        )
        if (playerWithSameRole.length === 2) {
          setErrorMessage('Only 2 Supports can be selected')
          acceptable = false
        }
      }
      if (acceptable) {
        setPlayingSquad([...playingSquad, playerId])
      }
    }
  }

  const removePlayingSquad = (playerId) => {
    let newPlayingSquad = playingSquad.filter((player) => player !== playerId)
    setPlayingSquad(newPlayingSquad)
  }

  const submitSquad = () => {
    let tournamentId = tid
    if (playingSquad.length < 5) {
      setErrorMessage('Please select 5 players for your Squad')
    } else {
      let reserveSquad = arcanaTeamIds.filter(
        (player) => !playingSquad.includes(player)
      )

      let addedAt = Moment().format('MM DD YYYY, h:mm:ss a')

      dispatch(
        submitPlayingSquad(
          userInfo._id,
          tournamentId,
          playingSquad,
          reserveSquad,
          addedAt
        )
      ).then(() => {
        dispatch(getMyTournaments(userInfo._id))
        dispatch(getSquadAddingPermission(userInfo._id, tid))
      })
    }
  }

  useEffect(() => {
    const now = Moment()
    const hour = now.hour()
    alert(hour)
    if (hour >= 0) {
      dispatch(getSquadAddingPermission(userInfo._id, tid))
    }
  }, [])

  useEffect(() => {
    dispatch(getMyTournaments(userInfo._id))
  }, [userInfo, dispatch])

  useEffect(() => {
    dispatch(getQualifiedPlayers(tid))
  }, [history, dispatch, tid])

  return (
    <div>
      <>
        <Header />
        {!allowed ? (
          <marquee
            style={{ background: 'red', color: 'white', fontWeight: '600' }}
          >
            Squads can only be submitted between 9:01 PM and 9:00 AM
          </marquee>
        ) : null}
        <Container style={{ minHeight: '82vh' }}>
          <Row>
            {allowed ? (
              <Col>
                {errorMessage !== '' ? (
                  <Popup
                    title='Team Selection'
                    body={errorMessage}
                    onClose={() => setErrorMessage('')}
                    type='success'
                  />
                ) : null}
                <h6 className=' text-center my-3'>
                  Select 2 Cores, 1 Offlaner and 2 Support Players
                </h6>
                <SelectTeamList
                  players={myArcanaTeam}
                  selectedPlayers={playingSquad}
                  nameFilter=''
                  teamFilter='Filter by Team'
                  addPlayers={addPlayingSquad}
                  removePlayers={removePlayingSquad}
                  previewStatus={false}
                />
                <div className='my-3'>
                  <LinkContainer
                    to={`/tournaments/${tid}`}
                    style={{ background: '#E512C23' }}
                  >
                    <Button variant='danger'>Back</Button>
                  </LinkContainer>
                  <Button
                    variant='success'
                    style={{ float: 'right' }}
                    onClick={submitSquad}
                  >
                    Submit
                  </Button>
                </div>
              </Col>
            ) : (
              <>
                <Col>
                  <>
                    <h5 className='my-3 text-center'>
                      Squad selected for Day {eventDayNum}
                    </h5>
                  </>
                  <Table>
                    <thead>
                      <tr>
                        <th>Avatar</th>
                        <th>Alias</th>
                        <th>Role</th>
                        <th>Team</th>
                      </tr>
                    </thead>
                    <tbody>
                      {squadDetails.length > 0
                        ? squadDetails.map((player) => (
                            <tr>
                              <td>
                                <Logo path={player.profile_image} />
                              </td>
                              <td>{player.alias}</td>
                              <td>{player.role}</td>
                              <td>
                                <Logo path={player.team.logo} />
                              </td>
                            </tr>
                          ))
                        : null}
                    </tbody>
                  </Table>
                </Col>
                <Col>
                  <>
                    <h5 className='my-3 text-center'>
                      Substitutes for Day {eventDayNum}
                    </h5>
                    <Table>
                      <thead>
                        <tr>
                          <th>Avatar</th>
                          <th>Alias</th>
                          <th>Role</th>
                          <th>Team</th>
                        </tr>
                      </thead>
                      <tbody>
                        {substitutDetails.length > 0
                          ? substitutDetails.map((player) => (
                              <tr>
                                <td>
                                  <Logo path={player.profile_image} />
                                </td>
                                <td>{player.alias}</td>
                                <td>{player.role}</td>
                                <td>
                                  <Logo path={player.team.logo} />
                                </td>
                              </tr>
                            ))
                          : null}
                      </tbody>
                    </Table>
                  </>
                </Col>
              </>
            )}
          </Row>
        </Container>
        <Footer />
      </>
    </div>
  )
}

export default TournamentDetailScreen
