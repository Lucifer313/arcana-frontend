import React from 'react'
import { Card } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import './style.css'

const PlayerCard = ({ profile_image, name, team, role, id, team_logo }) => {
  return (
    <Card className='my-4 player-card-container'>
      <Card.Img
        variant='top'
        src={`http://localhost:7000/${profile_image}`}
        className='player-card-logo'
      />
      <img
        src={`http://localhost:7000/${team_logo}`}
        className='player-team-logo'
        alt='team-logo'
      />
      <Card.Body className='player-card-body'>
        <LinkContainer to={`/players/${id}`}>
          <Card.Title className='player-card-title'>{name}</Card.Title>
        </LinkContainer>
        <div class='player-details-container'>
          <Card.Text className='player-card-info'>{team}</Card.Text>
          <Card.Text className='player-card-info'>Role: {role}</Card.Text>
          <LinkContainer to={`/players/${id}`}>
            <Card.Text className='player-card-info player-more-info'>
              More info {'>'}
            </Card.Text>
          </LinkContainer>
        </div>
      </Card.Body>
    </Card>
  )
}

export default PlayerCard
