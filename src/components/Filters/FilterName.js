import React, { useState, useEffect } from 'react'
import { Form, Col } from 'react-bootstrap'
import './filters.css'

const FilterName = ({ name, change, label, placeholder }) => {
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    console.log(name)
    setFilterName(name)
  })

  return (
    <Col md={2}>
      <Form.Group controlId='regionFilter' className='mt-3'>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          type='text'
          placeholder={placeholder}
          value={filterName}
          onChange={change}
          style={{ padding: '.5rem !important' }}
        />
      </Form.Group>
    </Col>
  )
}

export default FilterName
