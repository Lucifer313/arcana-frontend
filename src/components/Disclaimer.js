import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const Disclaimer = ({ setSection }) => {
  const [enableButton, setEnableButton] = useState(false)
  return (
    <div className='my-4'>
      <h3 className='text-center'>
        Following are the rules for creating a team:
      </h3>
      <p>
        <ol>
          <li>
            Each Arcana team should be made up of 12 Professional Players.
          </li>
          <li>
            Each Arcana team should not have more than 3 players from the same
            Professional team.
          </li>
          <li>
            Each Arcana team will be made up of Playing-5 and 7-Substitutes.
          </li>
          <li>
            The Playing-5 for each team shall consist of 2 Cores (Carry and Mid
            Roles), 1 Offlaner and 2 Supports (Hard Support and Soft Supports).
          </li>
          <li>
            Each Arcana team can have a maximum of 3 substitutions made at the
            start of each day of the event.
          </li>
        </ol>
      </p>
      <h3 className='text-center'>
        Following are the steps for creating a team
      </h3>
      <p>
        <ol>
          <li>Select 4-5 Core (Safe - Mid) role players.</li>
          <li>Select 2-5 Offlaners.</li>
          <li>Select 4-5 Core (Hard - Soft) Support role players.</li>
          <li>Select your PRO team for WIN PREDICTION</li>
        </ol>
      </p>
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
