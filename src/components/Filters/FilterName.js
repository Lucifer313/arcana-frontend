import React from 'react'
import { Form, Col } from 'react-bootstrap'
import './filters.css'

const FilterName = ({ name, change }) => {
  return (
    <Col md={2}>
      <Form.Group controlId='regionFilter' className='mt-3'>
        <Form.Label>Filter by Name</Form.Label>
        <Form.Control
          type='text'
          placeholder='Search name of the team'
          value={name}
          onChange={change}
          style={{ padding: '.5rem !important' }}
        />
      </Form.Group>
    </Col>
  )
}

export default FilterName
