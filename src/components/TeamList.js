import React from 'react'
import { Table, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Logo from './Logo'

export const TeamList = ({ teams, deleteModal }) => {
  let counter = 0

  return (
    <Table striped hover>
      <thead>
        <tr>
          <th>Sr.</th>
          <th>Team Name</th>
          <th>Region</th>
          <th>Avatar</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {teams.length > 0 ? (
          teams.map((t) => (
            <tr key={t._id}>
              <td>{++counter}</td>
              <td>{t.name}</td>
              <td>{t.region}</td>
              <td>
                <Logo path={t.logo} />
              </td>
              <td>
                <LinkContainer to={'/admin/teams/edit/' + t._id}>
                  <Button variant='warning'>
                    <i class='fas fa-edit'></i>
                  </Button>
                </LinkContainer>
              </td>
              <td>
                <Button variant='danger' onClick={() => deleteModal}>
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

export default TeamList
