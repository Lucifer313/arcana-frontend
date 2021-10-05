import React from 'react'
import { Card } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import dotenv from 'dotenv'

import './style.css'

dotenv.config()

const PlayerCard = ({ profile_image, name, team, role, id, team_logo }) => {
  return (
    <Card className='my-4 player-card-container'>
      <div
        style={{
          backgroundImage: `url(${'/assets/images/user/ti10-2021.png'})`,
        }}
      >
        <Card.Img
          variant='top'
          src={process.env.REACT_APP_SERVER_URL + profile_image}
          className='player-card-logo'
        />
        <img
          src={process.env.REACT_APP_SERVER_URL + team_logo}
          className='player-team-logo'
          alt='team-logo'
        />
      </div>
      <Card.Body className='player-card-body'>
        <LinkContainer to={`/players/${id}`}>
          <Card.Title className='player-card-title'>{name}</Card.Title>
        </LinkContainer>
        <div class='player-details-container'>
          <Card.Text className='player-card-info'>{team}</Card.Text>
          <Card.Text className='player-card-info'>Role: {role}</Card.Text>
          <LinkContainer to={`/players/${id}`}>
            <Card.Text className='player-card-info player-more-info'>
              More info &#x27F6;
            </Card.Text>
          </LinkContainer>
        </div>
      </Card.Body>
    </Card>
  )
}

export default PlayerCard
