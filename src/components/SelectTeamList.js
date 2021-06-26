import React from 'react'
import { Table, Button } from 'react-bootstrap'
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

  return (
    <>
      <div style={{ height: '74vh', overflowY: 'auto' }}>
        <Table striped hover style={{ maxHeight: '80vh', overflowY: 'auto' }}>
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Team</th>
              <th>Add</th>
            </tr>
          </thead>
          <tbody>
            {players
              .filter((p) => role.includes(p.role))
              .map((p) => (
                <tr key={p._id}>
                  <td>
                    <Logo path={p.profile_image} />
                  </td>
                  <td>{p.alias}</td>
                  <td>
                    <Logo path={p.team.logo} />
                  </td>
                  <td>
                    {!selectedPlayers.includes(p._id) && !previewStatus ? (
                      <Button
                        variant='primary'
                        onClick={() => addPlayers(p._id)}
                      >
                        <i class='fas fa-plus-circle'></i>
                      </Button>
                    ) : (
                      <Button
                        variant='danger'
                        onClick={() => removePlayers(p._id)}
                      >
                        <i class='fas fa-times'></i>
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
