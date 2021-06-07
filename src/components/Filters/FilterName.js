import React from 'react'
import { Form, Col } from 'react-bootstrap'
import './filters.css'

const FilterName = ({ name, change, label, placeholder }) => {
  return (
    <Col md={2}>
      <Form.Group controlId='regionFilter' className='mt-3'>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          type='text'
          placeholder={placeholder}
          value={name}
          onChange={change}
          style={{ padding: '.5rem !important' }}
        />
      </Form.Group>
    </Col>
  )
}

export default FilterName
