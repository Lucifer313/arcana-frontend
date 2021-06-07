import React from 'react'
import { Col, Form } from 'react-bootstrap'

const Sorter = ({ sort, sortBy }) => {
  return (
    <Col md={2}>
      <Form.Group controlId='regionFilter' className='mt-3'>
        <Form.Label>Sort by</Form.Label>
        <Form.Control as='select' value={sort} onChange={sortBy}>
          <option>Default</option>
          <option>Name ASC</option>
          <option>Name DESC</option>
          <option>Region ASC</option>
          <option>Region DESC</option>
        </Form.Control>
      </Form.Group>
    </Col>
  )
}

export default Sorter
