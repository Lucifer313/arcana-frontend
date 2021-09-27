import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useParams } from 'react-router'
import Moment from 'moment'

import SelectTeamList from './SelectTeamList'
import Popup from './Popup'
import Loader from './Loader'

import {
  getMyTournaments,
  getSquadAddingPermission,
  getSquadByDay,
  submitPlayingSquad,
} from '../actions/user-action'
import {
  ADD_PLAYER_TO_SQUAD,
  GET_SQUAD_BY_DAY_RESET,
  REMOVE_PLAYER_FROM_SQUAD,
  RESET_PLAYER_SQUAD,
} from '../constants/user-constants'
import { LinkContainer } from 'react-router-bootstrap'
import Header from './Layout/User/Header'
import Footer from './Layout/User/Footer'

const SquadSelector = ({ navigation }) => {
  const dispatch = useDispatch()

  const { tid } = useParams()

  const userDetails = useSelector((state) => state.userDetails)
  const { myTournaments, userInfo, adding, previousSquad, newPlayingSquad } =
    userDetails
  const tournamentDetails = useSelector((state) => state.tournamentDetails)
  const { qualifiedPlayers } = tournamentDetails

  const { playingSquadIds } = previousSquad

  let tournament = myTournaments.filter((t) => t._id === tid)[0]

  //Extracting the arcana squad for this tournament
  let arcanaTeamIds = tournament.arcanaTeam

  let myArcanaTeam = qualifiedPlayers.filter((player) =>
    arcanaTeamIds.includes(player._id)
  )

  const [errorMessage, setErrorMessage] = useState('')
  const [confirmationModal, setConfirmationModal] = useState(false)
  const [confirmBody, setConfirmBody] = useState('')
  //Adding a player to the squad selection
  const addPlayingSquad = (playerId) => {
    //Intializing the acceptable value for the new player to be added to true
    let acceptable = true
    //If squad length is already 5 and new player is selected
    if (newPlayingSquad.length === 5) {
      setErrorMessage('You can only select 5 players for the Playing Squad')
    } else {
      //Getting the New Selected Player Role
      let newPlayerRole = qualifiedPlayers.filter(
        (player) => player._id === playerId
      )[0].role

      let selectedPlayerDetails = qualifiedPlayers.filter((player) =>
        newPlayingSquad.includes(player._id)
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
        dispatch({ type: ADD_PLAYER_TO_SQUAD, payload: playerId })
      }
    }
  }
  //Removing a player from the squad selection
  const removePlayingSquad = (playerId) => {
    //Playing Squad ID would be populated only if it is not day 1
    if (playingSquadIds.length === 5) {
      //If 3 players have been unsele
      if (newPlayingSquad.length === 2) {
        setErrorMessage('You can only make 3 changes to your yesterday squad')
      } else {
        dispatch({ type: REMOVE_PLAYER_FROM_SQUAD, payload: playerId })
      }
    }
    //If it is day1 the playingSquad IDS would not be there hence its day 1 of squad selection and you can shuffle the entire squad
    else if (playingSquadIds.length === 0) {
      dispatch({ type: REMOVE_PLAYER_FROM_SQUAD, payload: playerId })
    }
  }

  //This function is executed to validate the squad selected and check if max 3 subs are made to previous squad
  const squadVerification = () => {
    if (newPlayingSquad.length < 5) {
      setErrorMessage('Please select 5 players for your Squad')
    } else {
      let squadVariation = playingSquadIds.filter(
        (p) => !newPlayingSquad.includes(p)
      )
      if (squadVariation.length > 3) {
        setErrorMessage('You can make a maximum of 3 substitutions')
      } else {
        if (squadVariation.length === 0 && playingSquadIds.length > 0) {
          setConfirmBody(
            'You are submitting the same squad as selected for yesterday. Are you sure you want to submit the same squad for the upcoming day?'
          )
        } else {
          setConfirmBody(
            'Are you sure you want to submit this squad for the upcoming day?'
          )
        }

        setConfirmationModal(true)
      }
    }
  }
  //Batched dispatches causes only one component refresh for all the dispatches against 1 for each dispatch
  const submitSquad = () => {
    setConfirmationModal(false)
    let tournamentId = tid

    let addedAt = Moment().format('MM DD YYYY, h:mm:ss a')

    let reserveSquad = arcanaTeamIds.filter(
      (player) => !newPlayingSquad.includes(player)
    )

    dispatch(
      submitPlayingSquad(
        userInfo._id,
        tournamentId,
        newPlayingSquad,
        reserveSquad,
        addedAt
      )
    ).then(() => {
      dispatch(getMyTournaments(userInfo._id))
      dispatch(getSquadAddingPermission(userInfo._id, tid))
    })
  }

  useEffect(() => {
    //    dispatch({ type: GET_SQUAD_BY_DAY_RESET })
    dispatch({ type: RESET_PLAYER_SQUAD })
    //  dispatch()
    dispatch(getSquadByDay(userInfo._id, tid, tournament.days.length))
  }, [])

  return (
    <>
      <Header />
      <Container
        className='my-2'
        style={{
          backgroundImage: `url(${'/assets/images/user/aegis-ti10.jpg'})`,
        }}
      >
        <Row>
          <Col>
            <p className='p-2 mb-0 page-banner'>
              Select your squad for Day: {tournament.days.length + 1}
            </p>
          </Col>
        </Row>
      </Container>
      <Col>
        {errorMessage !== '' ? (
          <Popup
            title='Team Selection'
            body={errorMessage}
            onClose={() => setErrorMessage('')}
            type='success'
          />
        ) : null}
        {confirmationModal ? (
          <Popup
            title='Squad Submission'
            body={confirmBody}
            type='confirm'
            onClose={() => setConfirmationModal(false)}
            onConfirm={submitSquad}
          />
        ) : null}
        <div style={{ minHeight: '70vh' }}>
          {playingSquadIds.length > 0 || tournament.days.length === 0 ? (
            <SelectTeamList
              players={myArcanaTeam}
              previousSelectedSquad={previousSquad.playingSquadIds}
              selectedPlayers={newPlayingSquad}
              nameFilter=''
              teamFilter='Filter by Team'
              addPlayers={addPlayingSquad}
              removePlayers={removePlayingSquad}
              previewStatus={false}
            />
          ) : (
            <div style={{ width: '10%', margin: 'auto' }}>
              <Loader />
            </div>
          )}
        </div>
        {adding ? (
          <div style={{ width: '10%', margin: 'auto' }}>
            <Loader />
          </div>
        ) : null}
        <div className='py-2'>
          {tournament.days.length !== 0 ? (
            <LinkContainer
              to={`/my-tournaments/${tid}/view-previous-squads/`}
              style={{ width: '100%', borderBottom: '2px solid #dcb570' }}
            >
              <Button className='arcana-link-btn'>View Previous Squads</Button>
            </LinkContainer>
          ) : null}
        </div>
        <div className='py-1 mb-1'>
          <Button
            className='arcana-btn'
            style={{
              backgroundColor: 'black',
              margin: '0px 2% 0px 0px',
            }}
            onClick={() => {
              dispatch({ type: RESET_PLAYER_SQUAD })
            }}
          >
            Reset
          </Button>{' '}
          <Button
            className='arcana-btn'
            onClick={squadVerification}
            style={{
              backgroundColor: 'black',
              margin: '0px 0px 0px 2%',
            }}
          >
            Submit
          </Button>
        </div>
      </Col>
      <Footer />
    </>
  )
}

export default SquadSelector
