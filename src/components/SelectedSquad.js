import React from 'react'
import { Col, Table } from 'react-bootstrap'
import Logo from './Logo'

const SelectedSquad = ({ squad, title }) => {
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
            <th>Team</th>
          </tr>
        </thead>
        <tbody>
          {squad.length > 0
            ? squad.map((player) => (
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
  )
}

export default SelectedSquad
