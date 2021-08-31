import React from 'react'
import { Col, Table } from 'react-bootstrap'
import Logo from './Logo'

import { useSelector } from 'react-redux'

//This component is used for displaying the squad that has already been selected//
//It is a user component//
const SelectedSquad = ({ squad, squadType, title }) => {
  const tournamentDetails = useSelector((state) => state.tournamentDetails)
  const { qualifiedPlayers } = tournamentDetails

  const userDetails = useSelector((state) => state.userDetails)
  const { previousSquad } = userDetails

  let squadWithoutPoints = qualifiedPlayers.filter((player) =>
    previousSquad.playingSquadIds.includes(player._id)
  )

  squad = squad.length > 0 ? squad : squadWithoutPoints

  return (
    <Col>
      <Table>
        <thead>
          <tr>
            <th
              colSpan={4}
              className='p-2 text-center'
              style={{
                background: '#2196f3',
                color: 'white',
                fontSize: '1.1em',
                borderRadius: '3px',
              }}
            >
              {' '}
              {title}
            </th>
          </tr>
          <tr>
            <th>Avatar</th>
            <th>Alias</th>
            <th>Role</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {squad.map((player) => (
            <tr>
              <td>
                <Logo path={player.profile_image} />
              </td>
              <td>{player.alias}</td>
              <td>{player.role}</td>

              {player.dayPoints === undefined || player.dayPoints === null ? (
                <td style={{ color: 'red' }}>TBD</td>
              ) : (
                <td style={{ color: 'blue' }}>
                  {Math.round(player.dayPoints * 100) / 100}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </Col>
  )
}

export default SelectedSquad
