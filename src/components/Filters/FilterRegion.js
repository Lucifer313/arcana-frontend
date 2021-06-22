import React, { useState, useEffect } from 'react'
import { Col, Form } from 'react-bootstrap'

const FilterRegion = ({ region, filterRegion, classes }) => {
  const [regionFilter, setRegionFilter] = useState('Filter by Region')

  useEffect(() => {
    setRegionFilter(region)
    console.log(region)
  }, [regionFilter])

  return (
    <Col md={2}>
      <Form.Group controlId='regionFilter' className='mt-3'>
        <Form.Label className='filter-labels'>Filter by Region</Form.Label>
        <Form.Control
          as='select'
          value={regionFilter}
          onChange={filterRegion}
          className={classes}
        >
          <option>Filter by Region</option>
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
