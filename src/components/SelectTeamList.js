import React from 'react'
import { Table, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Logo from '../components/Logo'

const SelectTeamList = ({
  players,
  selectedPlayers,
  addPlayers,
  removePlayers,
  role,
  previewStatus,
  nameFilter,
  teamFilter,
}) => {
  role = !role
    ? ['Hard Support', 'Soft Support', 'Offlane', 'Mid', 'Carry']
    : role

  players =
    nameFilter !== ''
      ? players.filter((p) =>
          p.alias.toLowerCase().includes(nameFilter.toLowerCase())
        )
      : players

  players =
    teamFilter !== 'Filter by Team'
      ? players.filter((p) => p.team._id === teamFilter)
      : players

  const tournamentDetails = useSelector((state) => state.tournamentDetails)
  const {
    qualifiedTeams: { eliminatedTeams },
  } = tournamentDetails

  return (
    <>
      <div style={{ height: '70vh', overflowY: 'auto' }}>
        <Table striped hover style={{ maxHeight: '80vh', overflowY: 'auto' }}>
          <thead
            style={{
              position: 'sticky',
              top: '0',
              zIndex: 1000,
            }}
          >
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Team</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {players
              .filter((p) => role.includes(p.role))
              .map((p) => (
                <tr
                  key={p._id}
                  className={
                    !selectedPlayers.includes(p._id) && !previewStatus
                      ? 'player-unselected'
                      : 'player-selected'
                  }
                  style={{
                    backgroundColor: eliminatedTeams.includes(p.team)
                      ? 'red'
                      : '',
                  }}
                >
                  <td>
                    <Logo path={p.profile_image} />
                  </td>
                  <td>{p.alias}</td>
                  <td>
                    <Logo path={p.team_info[0].logo} />
                  </td>
                  <td>
                    {!selectedPlayers.includes(p._id) && !previewStatus ? (
                      <Button
                        className='add-btn'
                        onClick={() => addPlayers(p._id)}
                      >
                        <i class='fas fa-plus'></i>
                      </Button>
                    ) : (
                      <Button
                        className='remove-btn'
                        onClick={() => removePlayers(p._id)}
                      >
                        <i class='fas fa-minus'></i>
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </>
  )
}

export default SelectTeamList
