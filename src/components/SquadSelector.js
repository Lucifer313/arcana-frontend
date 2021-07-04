import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Col, Button } from 'react-bootstrap'
import { useParams } from 'react-router'
import Moment from 'moment'

import { LinkContainer } from 'react-router-bootstrap'
import SelectTeamList from './SelectTeamList'
import Popup from './Popup'

import {
  getMyTournaments,
  getSquadAddingPermission,
  getSquadByDay,
  submitPlayingSquad,
} from '../actions/user-action'

const SquadSelector = () => {
  const [playingSquad, setPlayingSquad] = useState([])
  //const [reserveSquad, setReserveSquad] = useState([])

  const dispatch = useDispatch()

  const { tid } = useParams()

  const userDetails = useSelector((state) => state.userDetails)
  const { myTournaments, userInfo, allowed, previousSquad } = userDetails
  const tournamentDetails = useSelector((state) => state.tournamentDetails)
  const { qualifiedPlayers } = tournamentDetails

  let tournament = myTournaments.filter((t) => t._id === tid)[0]

  //Extracting the arcana squad for this tournament
  let arcanaTeamIds = tournament.arcanaTeam

  let myArcanaTeam = qualifiedPlayers.filter((player) =>
    arcanaTeamIds.includes(player._id)
  )
  const [errorMessage, setErrorMessage] = useState('')

  //Adding a player to the squad selection
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
  //Removing a player from the squad selection
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
        //dispatch(getSquadByDay(userInfo._id, tid, day + 1))
      })
    }
  }

  return (
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
  )
}

export default SquadSelector
