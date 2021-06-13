import React, { useState, useEffect } from 'react'
import { Form, Col } from 'react-bootstrap'
import './filters.css'

const FilterName = ({ name, change, label, placeholder, classes }) => {
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    setFilterName(name)
  }, [name])

  return (
    <Col md={2}>
      <Form.Group controlId='nameFilter' className='mt-3 '>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          type='text'
          className={classes}
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
