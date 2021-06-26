import React from 'react'
import { Button, Table } from 'react-bootstrap'
import Logo from '../components/Logo'

import { useSelector } from 'react-redux'

export default function TeamPreview({ onClose, team, remove }) {
  const tournamentDetails = useSelector((state) => state.tournamentDetails)
  const { qualifiedPlayers } = tournamentDetails

  const previewPlayers = qualifiedPlayers.filter((p) => team.includes(p._id))

  return previewPlayers.length === 0 ? (
    <div style={{ minHeight: '80vh' }}>
      <h5 className='py-5'>
        No player has been selected yet. Please select your players and then
        preview. them
      </h5>
      <Button variant='danger' onClick={onClose}>
        Close
      </Button>
    </div>
  ) : (
    <>
      <h5 className='text-center my-2'>My Arcana Team Preview</h5>
      <p>Players selected: {previewPlayers.length}</p>
      <div style={{ height: '74vh', overflowY: 'auto' }}>
        <Table striped hover>
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Team</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {previewPlayers.map((p) => (
              <tr key={p._id}>
                <td>
                  <Logo path={p.profile_image} />
                </td>
                <td>{p.alias}</td>
                <td>
                  <Logo path={p.team.logo} />
                </td>
                <td>
                  <Button variant='danger' onClick={() => remove(p._id)}>
                    <i class='fas fa-times'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Button variant='danger' onClick={onClose} className='my-2'>
        Close
      </Button>
    </>
  )
}
