import React from 'react'
import ReactDom from 'react-dom'
import { Modal, Button } from 'react-bootstrap'

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: '50px',
  zIndex: 1000,
  width: '100%',
}

export default function Popup({ title, body, onClose, type }) {
  return ReactDom.createPortal(
    <Modal.Dialog style={MODAL_STYLES}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{body}</p>
      </Modal.Body>
      <Modal.Footer>
        {type === 'success' ? (
          <Button variant='success' onClick={onClose}>
            Okay
          </Button>
        ) : null}
      </Modal.Footer>
    </Modal.Dialog>,
    document.getElementById('portal')
  )
}
