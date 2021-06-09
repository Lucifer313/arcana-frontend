import React from 'react'
import { Table, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Logo from './Logo'

const PlayerList = ({ players, deleteModal }) => {
  let counter = 0

  return (
    <Table striped hover>
      <thead>
        <tr>
          <th>Sr.</th>
          <th>Name</th>
          <th>Region</th>
          <th>Avatar</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {players.length > 0 ? (
          players.map((p) => (
            <tr key={p._id}>
              <td>{++counter}</td>
              <td>{p.alias}</td>
              <td>{p.region}</td>
              <td>
                <Logo path={p.profile_image} />
              </td>
              <td>
                <LinkContainer to={'/admin/players/edit/' + p._id}>
                  <Button variant='warning'>
                    <i class='fas fa-edit'></i>
                  </Button>
                </LinkContainer>
              </td>
              <td>
                <Button variant='danger' onClick={() => deleteModal(p._id)}>
                  <i class='fas fa-trash-alt'></i>
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={6} className='text-center'>
              No matching records found for your selection
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  )
}

export default PlayerList
