import React, { useState } from 'react';

import { Button, Modal } from 'react-bootstrap';

interface Props {
  activateButtonText: string;
  title: string;
  body: React.ReactNode;
  activateButtonClassName?: string;
}

const CustomModal = ({
  activateButtonText,
  body,
  title,
  activateButtonClassName
}: Props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="primary"
        className={activateButtonClassName}
        onClick={handleShow}
      >
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
