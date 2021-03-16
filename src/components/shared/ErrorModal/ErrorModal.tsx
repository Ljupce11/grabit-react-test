import React from 'react';
import { Button, Modal } from 'react-bootstrap';

interface Props {
  show: boolean
  onHide: () => void,
  errorMessage: string | null
}

export const ErrorModal: React.FC<Props> = ({ onHide, show, errorMessage }) => {
  return (
    <Modal
      centered
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Error
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4 className="m-0 text-center">{errorMessage}</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide} variant="secondary">Close</Button>
      </Modal.Footer>
    </Modal>
  )
}