import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { getQualifiedPlayers } from '../../actions/tournament-action'

const CreateTournamentTeamScreen = ({ match, history }) => {
  const [role, setRole] = useState('Hard Support')

  const tournamentDetails = useSelector((state) => state.tournamentDetails)
  const { teams, qualified_players, loading, loaded, error } = tournamentDetails

  const dispatch = useDispatch()
  const { tid } = useParams()

  useEffect(() => {
    dispatch(getQualifiedPlayers(tid, role))
  }, [])

  return <div></div>
}

export default CreateTournamentTeamScreen
