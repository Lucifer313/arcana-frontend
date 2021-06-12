import React from 'react'
import { Card } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import './style.css'

const TeamCard = ({ logo, name, region, id }) => {
  return (
    <Card className='my-4 team-card-container'>
      <Card.Img
        variant='top'
        src={`http://localhost:7000/${logo}`}
        className='team-card-logo'
      />
      <Card.Body className='team-card-body'>
        <LinkContainer to={`/teams/${id}`}>
          <Card.Title className='team-card-title'>{name}</Card.Title>
        </LinkContainer>
        <div class='team-details-container'>
          <Card.Text className='team-card-info'>{region} Region</Card.Text>
          <Card.Text className='team-card-info'>
            TI Best Performance: 3rd
          </Card.Text>
          <LinkContainer to={`/teams/${id}`}>
            <Card.Text className='team-card-info team-more-info'>
              More info {'>'}
            </Card.Text>
          </LinkContainer>
        </div>
      </Card.Body>
    </Card>
  )
}

export default TeamCard
