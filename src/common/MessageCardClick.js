import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const MessageCardClick = ({ show, closeModal }) => {

  return (
    <Modal show={show} onHide={closeModal} >
      <Modal.Header closeButton>
        <Modal.Title>Message</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='text-center delete-error'>
          <p>Thank you for your interest in our product.</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" className='w-25' onClick={closeModal}>
        Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MessageCardClick;
