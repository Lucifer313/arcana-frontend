import React from 'react'
import { Col, Form } from 'react-bootstrap'

const FilterRegion = ({ region, filterRegion }) => {
  return (
    <Col md={3}>
      <Form.Group controlId='regionFilter' className='mt-3'>
        <Form.Label>Filter by Region</Form.Label>
        <Form.Control as='select' value={region} onChange={filterRegion}>
          <option>All</option>
          <option>EU</option>
          <option>China</option>
          <option>SEA</option>
          <option>NA</option>
          <option>SA</option>
        </Form.Control>
      </Form.Group>
    </Col>
  )
}

export default FilterRegion
