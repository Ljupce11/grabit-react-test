import React from 'react';
import { Alert, Button, Modal } from 'react-bootstrap';

interface Props {
  show: boolean
  itemType: string
  onHide: () => void
  errorMessage: string
  onDeleteHandler: () => void
}

export const DeleteConfirmationModal: React.FC<Props> = ({ onHide, onDeleteHandler, itemType, show, errorMessage }) => {
  return (
    <Modal
      centered
      show={show}
      aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete {itemType}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="m-0">Are you sure you would like to delete this {itemType}?</p>
        {
          errorMessage &&
          <Alert className="mt-2 mb-0" variant='danger'>
            {errorMessage}
          </Alert>
        }
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide} variant="secondary">Cancel</Button>
        <Button onClick={onDeleteHandler} variant="danger">Delete</Button>
      </Modal.Footer>
    </Modal>
  )
}