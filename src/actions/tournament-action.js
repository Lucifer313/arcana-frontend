import axios from '../axios-config'
import {
  ADD_MATCH_POINTS_FAILURE,
  ADD_MATCH_POINTS_REQUEST,
  ADD_MATCH_POINTS_SUCCESS,
  ARCANA_LEADERBOARD_FAILURE,
  ARCANA_LEADERBOARD_REQUEST,
  ARCANA_LEADERBOARD_SUCCESS,
  CREATE_TOURNAMENT_FAILURE,
  CREATE_TOURNAMENT_REQUEST,
  CREATE_TOURNAMENT_SUCCESS,
  DELETE_TOURNAMENT_FAILURE,
  DELETE_TOURNAMENT_REQUEST,
  DELETE_TOURNAMENT_SUCCESS,
  ELIMINATE_TEAM_FAILURE,
  ELIMINATE_TEAM_REQUEST,
  ELIMINATE_TEAM_SUCCESS,
  GET_QUALIFIED_PLAYERS_FAILURE,
  GET_QUALIFIED_PLAYERS_REQUEST,
  GET_QUALIFIED_PLAYERS_SUCCESS,
  GET_QUALIFIED_TEAMS_FAILURE,
  GET_QUALIFIED_TEAMS_REQUEST,
  GET_QUALIFIED_TEAMS_SUCCESS,
  GET_TOURNAMENTS_FAILURE,
  GET_TOURNAMENTS_REQUEST,
  GET_TOURNAMENTS_SUCCESS,
  PLAYER_LEADERBOARD_FAILURE,
  PLAYER_LEADERBOARD_REQUEST,
  PLAYER_LEADERBOARD_SUCCESS,
  UNDO_ELIMINATE_TEAM_FAILURE,
  UNDO_ELIMINATE_TEAM_REQUEST,
  UNDO_ELIMINATE_TEAM_SUCCESS,
} from '../constants/tournament-constants'

export const createTournament =
  (
    name,
    tier,
    number_of_teams,
    prize_pool,
    begin_date,
    end_date,
    number_of_days,
    teams
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: CREATE_TOURNAMENT_REQUEST })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        '/tournaments/create',
        {
          name,
          tier,
          number_of_teams,
          prize_pool,
          begin_date,
          end_date,
          number_of_days,
          teams,
        },
        config
      )

      dispatch({
        type: CREATE_TOURNAMENT_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: CREATE_TOURNAMENT_FAILURE,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const getTournaments = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_TOURNAMENTS_REQUEST,
    })

    const { data } = await axios.get('/tournaments')

    dispatch({
      type: GET_TOURNAMENTS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_TOURNAMENTS_FAILURE,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteTournament = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_TOURNAMENT_REQUEST,
    })

    const { data } = await axios.delete(`/tournaments/${id}`)

    dispatch({
      type: DELETE_TOURNAMENT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: DELETE_TOURNAMENT_FAILURE,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getQualifiedPlayers = (tournamentId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_QUALIFIED_PLAYERS_REQUEST,
    })

    const { data } = await axios.get(
      `/tournaments/${tournamentId}/qualified-players`
    )

    dispatch({
      type: GET_QUALIFIED_PLAYERS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_QUALIFIED_PLAYERS_FAILURE,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getQualifiedTeams = (tournamentId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_QUALIFIED_TEAMS_REQUEST,
    })

    const { data } = await axios.get(
      `/tournaments/${tournamentId}/qualified-teams/`
    )

    dispatch({
      type: GET_QUALIFIED_TEAMS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_QUALIFIED_TEAMS_FAILURE,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const addMatchPoints =
  (tournamentId, matchId, dayNum, matchNum, team1, team2) =>
  async (dispatch) => {
    try {
      dispatch({ type: ADD_MATCH_POINTS_REQUEST })

      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      }

      const data = await axios.post(
        '/tournaments/add-points',
        { tournamentId, matchId, dayNum, matchNum, team1, team2 },
        config
      )

      dispatch({
        type: ADD_MATCH_POINTS_SUCCESS,
      })
    } catch (error) {
      dispatch({
        type: ADD_MATCH_POINTS_FAILURE,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const getPlayerLeaderboard = (tournamentId) => async (dispatch) => {
  try {
    dispatch({
      type: PLAYER_LEADERBOARD_REQUEST,
    })

    const { data } = await axios.get(
      `/tournaments/${tournamentId}/player-leaderboard/`
    )

    dispatch({
      type: PLAYER_LEADERBOARD_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PLAYER_LEADERBOARD_FAILURE,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const eliminateTeam = (tournamentId, teamId) => async (dispatch) => {
  try {
    console.log('TournamentID: ' + tournamentId)
    console.log('TeamID: ' + teamId)

    dispatch({
      type: ELIMINATE_TEAM_REQUEST,
    })
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    }
    const { data } = await axios.patch(
      `/tournaments/${tournamentId}/eliminate-team`,
      { teamId },
      config
    )

    dispatch({
      type: ELIMINATE_TEAM_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ELIMINATE_TEAM_FAILURE,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const undoTeamElimination =
  (tournamentId, teamId) => async (dispatch) => {
    try {
      dispatch({
        type: UNDO_ELIMINATE_TEAM_REQUEST,
      })
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      }

      const { data } = await axios.patch(
        `/tournaments/${tournamentId}/undo-eliminate-team`,
        { teamId },
        config
      )

      dispatch({
        type: UNDO_ELIMINATE_TEAM_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: UNDO_ELIMINATE_TEAM_FAILURE,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const getArcanaLeaderboard = (tournamentId) => async (dispatch) => {
  try {
    dispatch({ type: ARCANA_LEADERBOARD_REQUEST })

    const { data } = await axios.get(
      `/tournaments/${tournamentId}/arcana-leaderboard`
    )

    dispatch({
      type: ARCANA_LEADERBOARD_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ARCANA_LEADERBOARD_FAILURE,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
