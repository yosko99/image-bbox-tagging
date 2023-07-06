/* eslint-disable multiline-ternary */
import React, { useState } from 'react';

import { Button, Form, InputGroup } from 'react-bootstrap';

const CustomInputGroup = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClick = () => {
    setIsVisible(false);
  };
  return isVisible ? (
    <InputGroup className="mb-3">
      <Form.Control required name="objectsToAnnotate" />
      <Button onClick={handleClick} variant="danger">
        Delete
      </Button>
    </InputGroup>
  ) : (
    <></>
  );
};

export default CustomInputGroup;
