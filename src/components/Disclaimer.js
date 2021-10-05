import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import Rules from './Rules'

const Disclaimer = ({ setSection }) => {
  const [enableButton, setEnableButton] = useState(false)
  return (
    <div className='my-4'>
      <Rules />
      <Form.Group controlId='formBasicCheckbox'>
        <Form.Check
          type='checkbox'
          label='I understand the rules and steps for creating the Arcana Team'
          onClick={() => setEnableButton(!enableButton)}
        />
      </Form.Group>
      {enableButton ? (
        <Button
          className='my-3 arcana-btn'
          style={{
            backgroundImage: `url(${'/assets/images/user/arcana_button.png'})`,
            color: 'white',
          }}
          onClick={() => setSection('Team-selection')}
        >
          CREATE TEAM
        </Button>
      ) : null}
    </div>
  )
}

export default Disclaimer
