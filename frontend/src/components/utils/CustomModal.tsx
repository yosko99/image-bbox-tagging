import React, { useState } from 'react';

import { Button, Modal } from 'react-bootstrap';

interface Props {
  activateButtonText: string;
  title: string;
  body: React.ReactNode;
}

const CustomModal = ({ activateButtonText, body, title }: Props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {activateButtonText}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
      </Modal>
    </>
  );
};

export default CustomModal;
